import { Component, inject } from '@angular/core';
import { AuthService } from '@micro-expense-tracker/auth/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '../../../modal/settings-modal/settings-modal.component';
import {
  DialogActionEnum,
  DialogData,
} from '../../../interface/modal.interface';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  readonly dialog = inject(MatDialog);

  currentDayAndTime: string = '';

  dialogActionEnum = DialogActionEnum;

  logout() {
    this.authService.signOut();
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      height: '270px',
      width: '450px',
      data: {
        title: 'Settings',
        action: this.dialogActionEnum.Settings,
        isSuccess: false,
      } as DialogData,
      disableClose: true,
    });

    // this.getListAfterSuccessCallApi(dialogRef)
  }
}
