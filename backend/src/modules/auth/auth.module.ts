import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/auth/schema/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAdminProviderModule } from 'src/common/firebase/firebase-admin-provider.module';

@Module({
  providers: [AuthService],
  exports: [AuthModule],
  imports: [FirebaseAdminProviderModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController]
})
export class AuthModule { }
