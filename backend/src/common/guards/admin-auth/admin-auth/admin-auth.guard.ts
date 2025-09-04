import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const currUser = req.currentUser;
    if(currUser?.role === 'admin') return true;
    const firebaseData = req.firebase;
    if(firebaseData?.admin === true || firebaseData?.claims?.admin === true) return true
    throw new ForbiddenException("Admin Only")
  }
}
