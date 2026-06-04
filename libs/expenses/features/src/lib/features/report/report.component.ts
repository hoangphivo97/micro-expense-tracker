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
  switchMap,
} from 'rxjs';
import { ExpenseService } from '@micro-expense-tracker/expenses/data-access';
import {
  FilterParams,
} from '@micro-expense-tracker/shared/types';
import { ExpenseList } from '@micro-expense-tracker/expenses/data-access';
import { CommonModule, DecimalPipe } from '@angular/common';
import { mainColorPieChart } from '@micro-expense-tracker/shared/constants';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

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

  readonly availableYears = signal<number[]>([]);

  private filter = signal<FilterParams>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })

  readonly monthExpenses = toSignal(
    toObservable(this.filter).pipe(
      switchMap((f) => this.expenseService.getExpenseList({ year: f.year, month: f.month }))
    ),
    { initialValue: [] as ExpenseList[] }
  );

  readonly prevMonthExpenses = toSignal(
    toObservable(this.filter).pipe(
      switchMap((f) => this.expenseService.getExpenseList(getPrevMonth(f)))
    ),
    { initialValue: [] as ExpenseList[] }
  );

  readonly yearExpenses = toSignal(
    toObservable(this.filter).pipe(
      switchMap((f) => this.expenseService.getExpenseList({ year: f.year }))
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

  onFitlerChanged(params: FilterParams) {
    this.filter.set(params);
  }

  private getCurrYear() {
    this.expenseService.getAllYearsWithDate()
      .subscribe({
        next: (years) => this.availableYears.set(years),
        error: (err) => console.error('Error fetching years:', err),
      });
  }
}
