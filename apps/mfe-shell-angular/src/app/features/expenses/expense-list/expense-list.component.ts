import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import {
  EditExpense,
  ExpenseList,
  FilterParams,
  PaidMethodEnum,
} from '../../../interface/expense.interface';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DateFormatValue,
  LocalStorageKey,
  ModalMessage,
} from '../../../common/login.strings';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateExpenseModalComponent } from '../../../modal/create-expense-modal/create-expense-modal.component';
import {
  DialogActionEnum,
  DialogData,
} from '../../../interface/modal.interface';
import { BaseModalComponent } from '../../../modal/base-modal/base-modal.component';
import { UserServiceService } from '../../../services/UserService/user-service.service';
import { CurrencyEnum } from '../../../interface/settings.interface';
import { SettingsServiceService } from '../../../services/SettingsService/settings-service.service';
import { LocalStorageService } from '../../../services/LocalStorage/local-storage.service';
import { MatInputModule } from '@angular/material/input';
import { EnumToStringPipe } from '../../../shared/EnumToStringPipe/enum-to-string.pipe';
import { AuthStore } from '@micro-expense-tracker/auth/data-access';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgbPaginationModule,
    FormsModule,
    DecimalPipe,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    EnumToStringPipe,
    FilterComponent,
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit {
  readonly userService = inject(UserServiceService);
  readonly settingsService = inject(SettingsServiceService);
  readonly localStorageService = inject(LocalStorageService);
  readonly dialog = inject(MatDialog);
  readonly renderer = inject(Renderer2);
  readonly authStore = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);

  displayedColumns: string[] = [
    'date',
    'description',
    'purpose',
    'paid',
    'for',
    'amount',
    'action',
  ];

  dataSource = new MatTableDataSource<ExpenseList>();

  dialogActionEnum = DialogActionEnum;
  paidMethodEnum = PaidMethodEnum;

  params!: FilterParams;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getToken();
    this.initDateFormat();
  }

  getExpenseList(params: FilterParams) {
    this.expenseService
      .getExpenseList(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: ExpenseList[]) => {
          this.dataSource.data = data;
        },
        (error) => {
          console.log(error);
        },
      );
  }

  getToken() {
    const token: string | null = localStorage.getItem('token');
    if (!token) return;
    this.authStore.setToken(token);
  }

  openCreateExpenseModal() {
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        title: 'Create new Expense',
        action: this.dialogActionEnum.Create,
        isSuccess: false,
      } as DialogData,
      disableClose: true,
    });

    this.getListAfterSuccessCallApi(dialogRef);
  }

  openEditExpenseModal(data: EditExpense) {
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        title: 'Edit Expense',
        action: this.dialogActionEnum.Edit,
        isSuccess: false,
        data: data,
      } as DialogData,
      disableClose: true,
    });

    this.getListAfterSuccessCallApi(dialogRef);
  }

  getListAfterSuccessCallApi(
    dialogRef: MatDialogRef<CreateExpenseModalComponent | BaseModalComponent>,
  ) {
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: DialogData) => {
        if (!res.isSuccess) return;
        this.getExpenseList(this.params);
      });
  }

  openDeleteConfirmModal(id: string, description: string) {
    const dialogRef = this.dialog.open(BaseModalComponent, {
      height: '200px',
      width: '400px',
      data: {
        title: 'Delete',
        action: this.dialogActionEnum.Delete,
        isSuccess: false,
        data: id,
        content: {
          message: ModalMessage.delete,
          description: description
        },
      } as DialogData,
      disableClose: true,
    });

    this.getListAfterSuccessCallApi(dialogRef);
  }

  getUserSettings() {
    this.settingsService
      .getUserSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        res?.currency as CurrencyEnum;
      });
  }

  initDateFormat() {
    if (!this.localStorageService.getItem(LocalStorageKey.dateFormat)) {
      this.localStorageService.setItem(
        LocalStorageKey.dateFormat,
        DateFormatValue.DMY,
      );
    }
  }

  onFitlerChanged(params: FilterParams) {
    this.params = params;
    this.getExpenseList(params);
  }

  get GlobalDateFormat(): string {
    return this.localStorageService.getItem(
      LocalStorageKey.dateFormat,
    ) as string;
  }
}
