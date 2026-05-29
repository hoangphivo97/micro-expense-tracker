import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@micro-expense-tracker/auth/features';

import { NgModule } from '@angular/core';
import { authGuard } from '@micro-expense-tracker/auth/data-access';
import { MainLayoutComponent, AuthLayoutComponent} from '@micro-expense-tracker/shared/ui';

export const routes: Routes = [
  // Layout dành cho auth (login)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@micro-expense-tracker/auth/features').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // 1. Chỉ giữ ĐÚNG một dòng redirect từ trang chủ về /dashboard
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      
      // 2. Định nghĩa tường minh path 'dashboard' bọc bên ngoài thư viện
      {
        path: 'dashboard',
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
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
