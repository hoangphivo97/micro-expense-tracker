import { EditExpense } from './expense.interface';

export interface DialogData {
  title: string;
  action: DialogActionEnum;
  isSuccess: boolean;
  data?: EditExpense | string;
  content?: string;
}

export enum DialogActionEnum {
  Create,
  Edit,
  Delete,
  Settings,
  Cancel,
  Register,
}

export interface DialogError {
  title: string;
  errorMsg: string;
  hint?: string;
}
