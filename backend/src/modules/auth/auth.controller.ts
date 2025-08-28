import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAdminService } from 'src/common/firebase/firebase-admin.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly fb: FirebaseAdminService,
    ) {

    }
    @Post('login')
    async login(@Body('token') token: string) {
        const { decoded, user } = await this.authService.verifyAndGetUser(token);
        return {
            message: 'Login success',
            user,
            provider: decoded.firebase?.sign_in_provider,
        };
    }

}
