import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { LoginRequestDto } from './auth.dto';
import { AuthServiceClient } from './auth.pb';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authClient = this.client.getService<AuthServiceClient>('AuthService');
  }

  login(req: LoginRequestDto) {
    return this.authClient.login(req);
  }

  googleLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('Unauthorized user');
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
