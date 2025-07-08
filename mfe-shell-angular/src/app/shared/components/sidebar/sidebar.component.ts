import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExpenseListComponent } from '../../../features/expenses/expense-list/expense-list.component';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, ExpenseListComponent, CommonModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  authService = inject(AuthService);
  user$ = this.authService.user$;
  collapsed = false;

  ngOnInit(): void {

  }



  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
