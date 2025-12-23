import { Component, inject } from '@angular/core';
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

  private destroy$ = new Subject<void>();
  expense$!: Observable<ExpenseList[]>;
  private filter$ = new BehaviorSubject<FilterParams>({});

  prevMonth$ = this.filter$.pipe(
    map((f) => getPrevMonth(f)),
    switchMap((p) => this.expenseService.getExpenseList(p)),
    shareReplay(1),
  );

  month$ = this.filter$.pipe(
    switchMap((p) =>
      this.expenseService.getExpenseList({ year: p.year, month: p.month }),
    ),
    shareReplay(1),
  );

  year$ = this.filter$.pipe(
    map((p) => p.year),
    distinctUntilChanged(),
    switchMap((year) => this.expenseService.getExpenseList({ year })), // không month → cả năm
    shareReplay(1),
  );

  kpis$ = combineLatest([this.month$, this.prevMonth$]).pipe(
    map(([curr, prev]) => {
      const kNow = calcKPIs(curr);
      const kPrev = calcKPIs(prev);
      return { ...kNow, changePct: calcChangePct(kNow.total, kPrev.total) };
    }),
    shareReplay(1),
  );

  lineOpts$ = this.month$.pipe(map(makeLineChart));
  pieOpts$ = this.month$.pipe(
    map((list) =>
      makePieChart(list, {
        title: 'Expense By Category',
        colors: mainColorPieChart,
      }),
    ),
  );
  barOpts$ = this.year$.pipe(
    map((list) =>
      makeMonthlyColumnChart(list, this.filter$.value.year as number, {
        title: 'Monthly Expenses',
        seriesName: 'Expenses',
      }),
    ),
  );

  constructor() {}

  onFitlerChanged(params: FilterParams) {
    this.filter$.next(params);
  }
}
