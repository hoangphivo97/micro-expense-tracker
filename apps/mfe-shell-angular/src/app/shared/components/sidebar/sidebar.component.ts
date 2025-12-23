import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DialogActionEnum } from '../../../interface/modal.interface';
import { MatDialog } from '@angular/material/dialog';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { navItems } from '../../../common/common-list';
import { NavItem } from '../../../interface/expense.interface';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';

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
  authService = inject(AuthService);
  private router = inject(Router);

  @Output() toggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Input() collapsed = false;

  user$ = this.authService.userObs$;
  dialogActionEnum = DialogActionEnum;
  faArrowRightFromBracket = faArrowRightFromBracket;

  activeItem: NavItem = NavItem.DASHBOARD;

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

  // openSettings() {
  //   const dialogRef = this.dialog.open(SettingsModalComponent, {
  //     height: '270px',
  //     width: '450px',
  //     data: { title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: false } as DialogData,
  //     disableClose: true
  //   })

  //   this.getListAfterSuccessCallApi(dialogRef)
  // }

  setActive(itemKey: NavItem) {
    this.activeItem = itemKey;
    this.router.navigateByUrl(itemKey);
  }

  get navItems() {
    return navItems;
  }
}
