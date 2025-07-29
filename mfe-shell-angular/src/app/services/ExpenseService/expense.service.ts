import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, QueryConstraint, where } from '@angular/fire/firestore';
import { Observable, switchMap, take } from 'rxjs';
import { ExpenseList, FilterParams } from '../../interface/expense.interface';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  readonly firestore = inject(Firestore)
  private expensesCollection = collection(this.firestore, 'expenses');
  readonly auth = inject(Auth)
  readonly user$ = authState(this.auth)


  constructor(
  ) { }


  getExpenseList(params: FilterParams): Observable<ExpenseList[]> {
    const { month, year, searchTerm } = params;
    return this.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('User is not logged in');

        const constraints: QueryConstraint[] = [where('userId', '==', user.uid)];

        // Need Improve this b/c Date on Firebase is Timestamp
        // if (month !== undefined) constraints.push(where('month', '==', month));
        // if (year !== undefined) constraints.push(where('year', '==', year));
        // if (searchTerm) constraints.push(where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));

        const userExpensesQuery = query(this.expensesCollection, ...constraints);

        return collectionData(userExpensesQuery, { idField: 'id' }) as Observable<ExpenseList[]>;
      })
    );
  }


  // createExpense(data: Omit<createExpense, 'userId'>) {
  //   const userId = this.auth.currentUser?.uid;
  //   if (!userId) throw new Error('User is not logged in');

  //   const expenseWithUser = { ...data, userId };
  //   return from(addDoc(this.expensesCollection, expenseWithUser));
  // }


  // editExpense(id: string, data: Omit<createExpense, 'userId'>) {
  //   const expenseRef = doc(this.firestore, `expenses/${id}`);
  //   return from(updateDoc(expenseRef, data));
  // }


  // deleteExpense(id: string) {
  //   const expenseRef = doc(this.firestore, `expenses/${id}`);
  //   return from(deleteDoc(expenseRef));
  // }


}
