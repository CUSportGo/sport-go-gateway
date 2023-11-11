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
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { FileController } from './file/file.controller';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';
import { SportareaController } from './sportarea/sportarea.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../src/proto/auth.proto'),
          url: process.env.AUTH_SERVICE_URL,
        },
      },
    ]),
    AuthModule,
    AdminModule,
    UserModule,
    SportareaModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/login', 'auth/register', 'auth/refreshToken')
      .forRoutes(
        AuthController,
        AdminController,
        UserController,
        BookingController,
        FileController,
        SportareaController,
      );
  }
}
