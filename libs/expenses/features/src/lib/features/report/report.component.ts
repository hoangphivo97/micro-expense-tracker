import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent, FilterComponent } from '@micro-expense-tracker/shared/ui';
import { MatIcon } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  makeMonthlyColumnChart,
  makeLineChart,
  makePieChart,
} from '../report/utils/multiple-charts-helper';
import { calcChangePct, calcKPIs, getPrevMonth } from '@micro-expense-tracker/expenses/data-access';
import {
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { ExpenseService } from '@micro-expense-tracker/expenses/data-access';
import {
  FilterParams,
} from '@micro-expense-tracker/shared/types';
import { ExpenseList } from '@micro-expense-tracker/expenses/data-access';
import { CommonModule, DecimalPipe } from '@angular/common';
import { mainColorPieChart } from '@micro-expense-tracker/shared/constants';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'lib-report',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterComponent,
    MatIcon,
    NgApexchartsModule,
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);

  readonly availableYears = signal<number[]>([]);

  readonly refreshTrigger = signal<number>(0);

  private readonly queryParamsSignal = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.parseUrl(this.router.url).queryParams),
      startWith(this.router.parseUrl(this.router.url).queryParams) // Extracts parameters instantly on load
    )
  );

  readonly filter = computed<FilterParams>(() => {
    const params = this.queryParamsSignal();
    return {
      year: params?.['year'] ? Number(params['year']) : new Date().getFullYear(),
      month: params?.['month'] ? Number(params['month']) : new Date().getMonth() + 1,
    };
  });

  readonly monthExpenses = toSignal(
    toObservable(computed(() => ({ f: this.filter(), refresh: this.refreshTrigger() }))).pipe(
      switchMap(({ f }) => this.expenseService.getExpenseList({ year: f.year, month: f.month }))
    ),
    { initialValue: [] as ExpenseList[] }
  );

  readonly prevMonthExpenses = toSignal(
    toObservable(computed(() => ({ f: this.filter(), refresh: this.refreshTrigger() }))).pipe(
      switchMap(({ f }) => this.expenseService.getExpenseList(getPrevMonth(f)))
    ),
    { initialValue: [] as ExpenseList[] }
  );

  readonly yearExpenses = toSignal(
    toObservable(computed(() => ({ f: this.filter(), refresh: this.refreshTrigger() }))).pipe(
      switchMap(({ f }) => this.expenseService.getExpenseList({ year: f.year }))
    ),
    { initialValue: [] as ExpenseList[] }
  );

  readonly kpis = computed(() => {
    const curr = this.monthExpenses();
    const prev = this.prevMonthExpenses();
    const kNow = calcKPIs(curr);
    const kPrev = calcKPIs(prev);
    return { ...kNow, changePct: calcChangePct(kNow.total, kPrev.total) };
  });

  readonly lineOpts = computed(() => makeLineChart(this.monthExpenses()));

  readonly pieOpts = computed(() =>
    makePieChart(this.monthExpenses(), {
      title: 'Expense By Category',
      colors: mainColorPieChart,
    })
  );

  readonly barOpts = computed(() => {
    const year = this.filter().year ?? new Date().getFullYear();
    return makeMonthlyColumnChart(this.yearExpenses(), year, {
      title: 'Monthly Expenses',
      seriesName: 'Expenses',
    });
  });

  ngOnInit() {
    this.getCurrYear();
  }

  onFilterChanged(params: FilterParams): void {
    this.router.navigate([], {
      queryParams: { year: params.year, month: params.month },
      queryParamsHandling: 'merge',
    });
  }

  private getCurrYear() {
    this.expenseService.getAllYearsWithDate()
      .subscribe({
        next: (years) => this.availableYears.set(years),
        error: (err) => console.error('Error fetching years:', err),
      });
  }
}
