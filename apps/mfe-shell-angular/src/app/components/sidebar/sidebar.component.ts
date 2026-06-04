import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '@micro-expense-tracker/auth/data-access';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DialogActionEnum, NavItem } from '@micro-expense-tracker/shared/types';
import { MatDialog } from '@angular/material/dialog';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { navItems } from '@micro-expense-tracker/shared/constants';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReactWrapperComponent } from '@micro-expense-tracker/shared/ui';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatIcon,
    FontAwesomeModule,
    RouterModule,
    ReactWrapperComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  @Output() toggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Input() collapsed = false;

  user$ = this.authService.userObs$;
  dialogActionEnum = DialogActionEnum;
  faArrowRightFromBracket = faArrowRightFromBracket;

  activeItem = NavItem.DASHBOARD;

  ngOnInit(): void {
    this.getUrlAndActiveSidebar();
  }

  getUrlAndActiveSidebar() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.setActiveItemByUrl(url);
      });
  }

  setActiveItemByUrl(url: string) {
    if (url.includes('/report')) {
      this.activeItem = NavItem.REPORT;
    } else if (url.includes('/dashboard')) {
      this.activeItem = NavItem.DASHBOARD;
    }
  }



setActive(itemKey: NavItem) {
    const currentQueryParams = this.router.parseUrl(this.router.url).queryParams;

    this.router.navigate([itemKey], {
      queryParams: currentQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  get navItems() {
    return navItems;
  }
}
