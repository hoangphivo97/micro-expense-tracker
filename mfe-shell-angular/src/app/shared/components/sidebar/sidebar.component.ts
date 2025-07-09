import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExpenseListComponent } from '../../../features/expenses/expense-list/expense-list.component';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DialogActionEnum, DialogData } from '../../../interface/modal.interface';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '../../../modal/settings-modal/settings-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, ExpenseListComponent, CommonModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  authService = inject(AuthService);
  user$ = this.authService.user$;
  collapsed = false;
  dialogActionEnum = DialogActionEnum

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      height: '270px',
      width: '450px',
      data: { title: "Settings", action: this.dialogActionEnum.Settings, isSuccess: false } as DialogData,
      disableClose: true
    })

    // this.getListAfterSuccessCallApi(dialogRef)
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
