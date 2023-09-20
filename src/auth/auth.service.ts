import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
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
  register(req: RegisterRequestDto) {
    return this.authClient.register(req);
  }
}
