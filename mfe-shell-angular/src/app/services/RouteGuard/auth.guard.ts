import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  private router: Router = inject(Router);

  canActivate(): boolean {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
    if (token) {
      return true;
    }
  
    this.router.navigate(['/login']);
    return false;
  }
}
