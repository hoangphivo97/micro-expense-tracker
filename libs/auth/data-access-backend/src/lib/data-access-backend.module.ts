import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from '@micro-expense-tracker/backend/auth/features';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'secretKey', 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], 
})
export class AuthDataAccessBackendModule {}
