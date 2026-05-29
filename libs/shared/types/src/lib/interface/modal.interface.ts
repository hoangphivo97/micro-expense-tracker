import { EditExpense } from '../../../../../expenses/data-access/src/lib/data-access/expense.interface';

export interface DialogData {
  title: string;
  action: DialogActionEnum;
  isSuccess: boolean;
  data?: EditExpense | string;
  content: DialogContent;
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

interface DialogContent {
  message: string;
}
