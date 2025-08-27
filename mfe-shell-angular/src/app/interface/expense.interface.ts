import { Timestamp } from "@angular/fire/firestore";
import { DropdownList } from "./settings.interface";

export interface ExpenseList {
    id: string;
    date: Date | Timestamp;
    description: string;
    purpose: string;
    paid: PaidMethodEnum;
    for?: string;
    amount: number;
    createdAt: Date | Timestamp;
    // budget: number;
    // remainBalance: number;
}

export enum PaidMethodEnum {
    CASH,
    CREDIT_CARD,
    BANK_TRANSFER
}

export interface CreateExpense extends Omit<ExpenseList, "id"> {

}

export interface EditExpense extends ExpenseList {

}

export type PaidMethodDropdownList = DropdownList<PaidMethodEnum>

export interface FilterParams {
    searchTerm?: string;
    month?: number;
    year?: number;
}

export enum NavItem{
    DASHBOARD = 'dashboard',
    REPORT = 'report',
    EXPENSE = "expense",
    USER = "user",
    MESSAGE = "message"
}
