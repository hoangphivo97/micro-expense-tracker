import { FilterParams } from '@micro-expense-tracker/shared/types';
import { ExpenseList } from '@micro-expense-tracker/expenses/data-access';

type KPIs = { total: number; count: number; max: number | null };

export function getPrevMonth(p: Partial<FilterParams>): FilterParams {
  return p.month! > 1
    ? { year: p.year, month: p.month! - 1 }
    : { year: (p.year as number) - 1, month: 12 };
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
