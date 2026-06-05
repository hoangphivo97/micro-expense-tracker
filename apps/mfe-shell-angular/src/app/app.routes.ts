import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { authGuard } from '@micro-expense-tracker/auth/data-access';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', 
        loadComponent: () => import('@micro-expense-tracker/auth/features').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'expense' },
      {
        path: '',
        loadChildren: () =>
          import('@micro-expense-tracker/expenses/features').then(
            (m) => m.EXPENSES_ROUTES
          ),
      },
    ],
  },
  // 404 fallback
  {
    path: '**',
    redirectTo: '/expense',
  },
];

export class AppRoutingModule {}
