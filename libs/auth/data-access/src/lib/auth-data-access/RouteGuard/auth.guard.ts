import { CanActivate, Router, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  private router = inject(Router);
  private auth = inject(AuthService);

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isLoading$.pipe(
      // 1) Chờ đến khi loading = false
      filter((loading) => !loading),
      take(1),
      // 2) Có user -> true; không có -> UrlTree tới /auth/login
      map(() => {
        const user = this.auth.currentUser;
        return user ? true : this.router.createUrlTree(['/auth/login']);
      }),
    );
  }
}
