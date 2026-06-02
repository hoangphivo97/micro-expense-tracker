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
        // Dùng loadComponent thay vì loadChildren cho Standalone Component
        loadComponent: () => import('@micro-expense-tracker/auth/features').then(m => m.LoginComponent)
      }
    ]
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
