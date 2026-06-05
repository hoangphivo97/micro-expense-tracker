// libs/auth/features-backend/src/lib/auth-features-backend.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthDataAccessBackendModule } from '@micro-expense-tracker/backend/auth/data-access';

@Module({
  imports: [AuthDataAccessBackendModule],
  controllers: [UserController],
})
export class AuthFeaturesBackendModule {}