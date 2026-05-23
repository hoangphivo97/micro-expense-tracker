import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
  FacebookAuthProvider,
  AuthProvider,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { LoginResponse } from '@micro-expense-tracker/shared/types';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './Akita/auth.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private apiUrl = 'http://localhost:3000/auth';
  private apiGoogleUrl = 'http://localhost:3000/auth/google-login';
  private apiFacebookUrl = 'http://localhost:3000/auth/facebook-login';
  private user$ = new BehaviorSubject<User | null>(null);
  private loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
    private router: Router,
  ) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.user$.next({
          displayName: user.displayName,
          email: user.email,
        } as User);
      } else {
        this.user$.next(null);
      }
      this.loading$.next(false);
    });
  }

  signInWithUserAccount(
    username: string,
    password: string,
  ): Observable<LoginResponse> {
    const loginData = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData);
  }

  signInWithGoogleAccount(): Observable<Object> {
    const provider = new GoogleAuthProvider();

    return this.signInWithProvider(provider, this.apiGoogleUrl);
  }

  signInWithFacebookAccount(): Observable<Object> {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');

    return this.signInWithProvider(provider, this.apiFacebookUrl);
  }

  private signInWithProvider(
    provider: AuthProvider,
    apiUrl: string,
  ): Observable<any> {
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((result: UserCredential) =>
        from(result.user.getIdToken()).pipe(
          switchMap((token: string) =>
            this.http.post(apiUrl, { uid: result.user.uid, token }),
          ),
        ),
      ),
    );
  }

  // clearAuthData() {
  //   this.authStore.update({ token: null }); // Clear Akita store
  //   this.router.navigate(['/login']); // Redirect to login
  // }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/auth/login']);
  }

  getIdToken(forceRefresh = false) {
    const user = this.auth.currentUser;
    return user ? user.getIdToken(forceRefresh) : '';
  }

  get isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }
  get userObs$(): Observable<User | null> {
    return this.user$.asObservable();
  }

  get currentUser(): User | null {
    return this.user$.value;
  }
}
