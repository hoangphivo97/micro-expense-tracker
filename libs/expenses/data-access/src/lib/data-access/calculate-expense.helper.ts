import { FilterParams } from '@micro-expense-tracker/shared/types';
import { ExpenseList } from './expense.interface';


export function getPrevMonth(p: Partial<FilterParams>): FilterParams {
  const currentMonth = p.month ?? new Date().getMonth() + 1;
  const currentYear = p.year ?? new Date().getFullYear();

  return currentMonth > 1
    ? { year: currentYear, month: currentMonth - 1 }
    : { year: currentYear - 1, month: 12 };
}

export function calcKPIs(list: ExpenseList[]) {
  const count = list.length;
  let total = 0,
    max = 0;
  for (const e of list) {
    const v = Number(e.amount) || 0;
    total += v;
    if (v > max) max = v;
  }
  return { total, count, max };
}

export function calcChangePct(currTotal: number, prevTotal: number) {
  return prevTotal > 0 ? ((currTotal - prevTotal) / prevTotal) * 100 : null;
}
