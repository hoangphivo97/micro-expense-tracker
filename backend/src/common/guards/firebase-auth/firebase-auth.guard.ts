import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from 'src/common/firebase/firebase-admin.service';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly fb: FirebaseAdminService,
    private readonly authService: AuthService
  ) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const idToken = authHeader.split(' ')[1];
    const { decoded, user } = await this.authService.verifyAndGetUser(idToken);

    req.firebase = decoded;
    req.currentUser = user;

    return true;
  }
}
