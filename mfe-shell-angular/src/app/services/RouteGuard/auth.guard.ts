import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  private router: Router = inject(Router);

  // isUserAuthenticated(): Observable<boolean> {
  //   return this.user$.pipe(
  //     take(1), // Only take first state
  //     map(user => !!user || !!localStorage.getItem('token'))
  //   );
  // }

  // canActivate(): Observable<boolean> {
  //   return this.isUserAuthenticated();
  // }

  canActivate(): boolean {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
