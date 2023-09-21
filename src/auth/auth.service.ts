import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { catchError, firstValueFrom, map } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import {
  AuthServiceClient,
  ValidateGoogleRequest,
  ValidateGoogleResponse,
} from './auth.pb';

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

  async googleLogin(request: ValidateGoogleRequest, response: Response) {
    if (!request) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const credential = await firstValueFrom(
      this.authClient.validateGoogle(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );

    response.cookie('accessToken', credential.credential.accessToken);
    response.cookie('refreshToken', credential.credential.refreshToken);
    response.status(301).redirect('http://localhost:3000');
  }
  register(req: RegisterRequestDto) {
    return this.authClient.register(req);
  }
}
