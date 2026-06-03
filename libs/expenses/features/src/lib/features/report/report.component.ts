import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { HeaderComponent, FilterComponent } from '@micro-expense-tracker/shared/ui';
import { MatIcon } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  makeMonthlyColumnChart,
  makeLineChart,
  makePieChart,
  calcChangePct,
  calcKPIs,
  getPrevMonth,
} from '@micro-expense-tracker/shared/utils';
import {
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
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
export class ReportComponent {
  readonly expenseService = inject(ExpenseService);
  private readonly destroyRef = inject(DestroyRef);

  availableYears: number[] = [];

  expense$!: Observable<ExpenseList[]>;
  private filter = signal<FilterParams>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })

  prevMonthData$ = toObservable(this.filter).pipe(
    map((f) => getPrevMonth(f)),
    switchMap((p) => this.expenseService.getExpenseList(p)),
    shareReplay(1),
  );

  monthData$ = toObservable(this.filter).pipe(
    switchMap((p) =>
      this.expenseService.getExpenseList({ year: p.year, month: p.month }),
    ),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    shareReplay(1),
  );

  yearData$ = toObservable(this.filter).pipe(
    map((p) => p.year),
    distinctUntilChanged(),
    switchMap((year) => this.expenseService.getExpenseList({ year })),
    shareReplay(1),
  );

  // Convert observables to signals for template use
  monthExpenses = toSignal(this.monthData$, { initialValue: [] as ExpenseList[] });
  prevMonthExpenses = toSignal(this.prevMonthData$, { initialValue: [] as ExpenseList[] });
  yearExpenses = toSignal(this.yearData$, { initialValue: [] as ExpenseList[] });

  // Calculate KPIs using signals
  kpis = computed(() => {
    const curr = this.monthExpenses();
    const prev = this.prevMonthExpenses();
    const kNow = calcKPIs(curr);
    const kPrev = calcKPIs(prev);
    return { ...kNow, changePct: calcChangePct(kNow.total, kPrev.total) };
  })

  // Prepare chart options using signals
  lineOpts = computed(() => makeLineChart(this.monthExpenses()));
  pieOpts = computed(() =>
    makePieChart(this.monthExpenses(), {
      title: 'Expense By Category',
      colors: mainColorPieChart,
    })
  );

  barOpts = computed(() => {
    const year = this.filter().year ?? new Date().getFullYear();
    return makeMonthlyColumnChart(this.yearExpenses(), year, {
      title: 'Monthly Expenses',
      seriesName: 'Expenses',
    })
  })

  onFitlerChanged(params: FilterParams) {
    this.filter.set(params);
  }

  getCurrYear() {
    this.expenseService.getAllYearsWithDate()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(years => this.availableYears = years);
  }
}
