import { Injectable, inject } from '@angular/core'; // Added inject import
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  token$: Observable<string | null> = this.select('token');

  constructor() {
    super(inject(AuthStore));
  }
}