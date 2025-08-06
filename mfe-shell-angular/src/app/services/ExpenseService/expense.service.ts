import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, DocumentReference, Firestore, getDoc, query, QueryConstraint, updateDoc, where } from '@angular/fire/firestore';
import { from, Observable, switchMap, take } from 'rxjs';
import { CreateExpense, ExpenseList, FilterParams } from '../../interface/expense.interface';


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

        if (month !== undefined && year !== undefined) {
          const startDate = new Date(year, month - 1, 1) // First Month
          const endDate = new Date(year, month, 0, 23, 59, 59, 999);

          constraints.push(where('date', '>=', startDate));
          constraints.push(where('date', '<=', endDate));
        }

        if (searchTerm) {
          constraints.push(
            where('description', '>=', searchTerm),
            where('description', '<=', searchTerm + '\uf8ff')
          );
        }

        const userExpensesQuery = query(this.expensesCollection, ...constraints);

        return collectionData(userExpensesQuery, { idField: 'id' }) as Observable<ExpenseList[]>;
      })
    );
  }


  createExpense(data: Omit<CreateExpense, 'userId'>): Observable<DocumentReference> {
    return this.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('User is not logged in');
        }

        const expenseWithUser = { ...data, userId: user.uid };
        return from(addDoc(this.expensesCollection, expenseWithUser));
      })
    );
  }



  editExpense(id: string, data: Omit<CreateExpense, 'userId' | 'createdAt'>) {
    const expenseRef = doc(this.firestore, `expenses/${id}`);
    // return from(updateDoc(expenseRef, data));
    return from(getDoc(expenseRef)).pipe(
      switchMap(snapshot => {
        if (!snapshot.exists()) {
          throw new Error('Document does not exist');
        }
        return updateDoc(expenseRef, data);
      })
    )
  }


  // deleteExpense(id: string) {
  //   const expenseRef = doc(this.firestore, `expenses/${id}`);
  //   return from(deleteDoc(expenseRef));
  // }


}
