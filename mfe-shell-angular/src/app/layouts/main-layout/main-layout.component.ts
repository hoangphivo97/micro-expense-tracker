import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../services/RouteGuard/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterModule, MatSidenavModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  collapsed = false;


  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
