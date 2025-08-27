import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';

import { NgModule } from '@angular/core';
import { authGuard } from './services/RouteGuard/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    // Layout dành cho auth (login)
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },
    // Layout chính (có sidebar)
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/expenses/expense-list/expense-list.component').then(m => m.ExpenseListComponent)
            },
            {
                path: 'report',
                loadComponent: () =>
                    import('./features/expenses/report/report.component').then(m => m.ReportComponent)
            }
        ]
    },
    // 404 fallback
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }