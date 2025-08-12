import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';

import { NgModule } from '@angular/core';
import { authGuard } from './services/RouteGuard/auth.guard';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    // Layout chính (có sidebar)
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
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
    // Layout dành cho auth (login)
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    // Redirect gốc về login nếu chưa đăng nhập
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    // 404 fallback
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }