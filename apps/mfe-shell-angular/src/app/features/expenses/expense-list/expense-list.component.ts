import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HeaderComponent, FooterComponent, CreateExpenseModalComponent, BaseModalComponent, EnumToStringPipe, FilterComponent} from '@micro-expense-tracker/shared/ui';
import {
  EditExpense,
  ExpenseList,
  FilterParams,
  PaidMethodEnum,
} from '@micro-expense-tracker/shared/types';
import { ExpenseService } from '@micro-expense-tracker/expenses/data-access';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DateFormatValue,
  LocalStorageKey,
  ModalMessage,
} from '@micro-expense-tracker/shared/constants';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DialogActionEnum,
  DialogData,
  CurrencyEnum
} from '@micro-expense-tracker/shared/types';
import { SettingsServiceService, LocalStorageService } from '@micro-expense-tracker/shared/data-access';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '@micro-expense-tracker/auth/data-access';
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
  readonly settingsService = inject(SettingsServiceService);
  readonly localStorageService = inject(LocalStorageService);
  readonly dialog = inject(MatDialog);
  readonly renderer = inject(Renderer2);
  readonly authStore = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);
  readonly expenseService = inject(ExpenseService);

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
