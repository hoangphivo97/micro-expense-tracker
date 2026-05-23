import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const attach = (token: string | null) =>
    token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return from(auth.getIdToken()).pipe(
    switchMap((token) => next(attach(token))),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        // refresh 1 lần rồi retry
        return from(auth.getIdToken(true)).pipe(
          switchMap((newToken) => next(attach(newToken))),
          catchError(async (err2) => {
            await auth.signOut();
            router.navigate(['/auth//login']);
            throw err2;
          }),
        );
      }
      throw err;
    }),
  );
};
