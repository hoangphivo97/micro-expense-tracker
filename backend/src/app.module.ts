import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminProviderModule } from './common/firebase/firebase-admin-provider.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/expense-tracker-app'),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    FirebaseAdminProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
