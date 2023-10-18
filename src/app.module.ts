import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SportareaModule } from './sportarea/sportarea.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/guard/auth.middleware';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AdminModule,
    UserModule,
    SportareaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
