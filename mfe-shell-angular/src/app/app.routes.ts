import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';

import { NgModule } from '@angular/core';
import { authGuard } from './services/RouteGuard/auth.guard';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'dashboard', loadComponent: () => import("./shared/components/sidebar/sidebar.component").then(m => m.SidebarComponent),
        canActivate: [authGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }