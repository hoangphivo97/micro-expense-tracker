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
    children: [{ path: 'login', component: LoginComponent }],
  },
  // Layout chính (có sidebar)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: '',
        loadChildren: () =>
          import('@micro-expense-tracker/expenses/features').then(
            (m) => m.EXPENSES_ROUTES,
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
