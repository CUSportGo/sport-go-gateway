import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { LoginRequestDto } from './auth.dto';
import { AuthServiceClient } from './auth.pb';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authClient = this.client.getService<AuthServiceClient>('AuthService');
  }

  async login(req: LoginRequestDto) {
    return await firstValueFrom(
      this.authClient.login(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }
}
