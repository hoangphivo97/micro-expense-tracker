import { FilterParams } from '../../interface/expense.interface';

export type MonthFilter = { year: number; month: number };
export type YearFilter = { year: number };

// guards
export function isMonthFilter(p: FilterParams): p is MonthFilter {
  return typeof p.year === 'number' && typeof p.month === 'number';
}
export function isYearFilter(p: FilterParams): p is YearFilter {
  return typeof p.year === 'number' && typeof p.month !== 'number';
}

export function getPrevMonth(p: MonthFilter): MonthFilter {
  return p.month > 1
    ? { year: p.year, month: p.month - 1 }
    : { year: p.year - 1, month: 12 };
}
