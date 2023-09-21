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
import { LoginRequestDto } from './auth.dto';
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

  googleLogin(request: ValidateGoogleRequest, response: Response) {
    if (!request) {
      throw new UnauthorizedException('Unauthorized user');
    }

    return this.authClient.validateGoogle(request).pipe(
      map((credential: ValidateGoogleResponse) => {
        response.cookie('accessToken', credential.credential.accessToken);
        response.cookie('refreshToken', credential.credential.accessToken);
        return response.status(301).redirect(process.env.BASEURL);
      }),
    );
  }
}
