import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { MatIcon } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  makeMonthlyColumnChart,
  makeLineChart,
  makePieChart,
} from '../../../shared/utils/multiple-charts-helper';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import {
  ExpenseList,
  FilterParams,
} from '../../../interface/expense.interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  calcChangePct,
  calcKPIs,
  getPrevMonth,
} from '../../../shared/utils/calculate-expense.helper';
import { mainColorPieChart } from '../../../common/common-list';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-report',
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

  constructor() { }

  onFitlerChanged(params: FilterParams) {
    this.filter.set(params);
  }
}
