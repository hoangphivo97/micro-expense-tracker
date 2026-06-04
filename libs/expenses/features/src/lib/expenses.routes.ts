import { Routes } from '@angular/router';

export const EXPENSES_ROUTES: Routes = [
  {
    path: 'expense',
    loadComponent: () =>
      import('./features/expense-list/expense-list.component').then(
        (m) => m.ExpenseListComponent
      ),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./features/report/report.component').then((m) => m.ReportComponent),
  },
];