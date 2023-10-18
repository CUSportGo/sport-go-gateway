import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { catchError, firstValueFrom, map } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import {
  AuthServiceClient,
  ForgotPasswordRequest,
  LogoutRequest,
  ResetPasswordRequest,
  ValidateOAuthRequest,
} from './auth.pb';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authClient = this.client.getService<AuthServiceClient>('AuthService');
  }

  async login(req: LoginRequestDto, response: Response) {
    const authPayload = await firstValueFrom(
      this.authClient.login(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
    response.cookie('accessToken', authPayload.credential.accessToken);
    response.cookie('refreshToken', authPayload.credential.refreshToken);
    response.cookie(
      'accessTokenExpiresIn',
      authPayload.credential.accessTokenExpiresIn,
    );
    response.cookie(
      'refreshTokenExpiresIn',
      authPayload.credential.refreshTokenExpiresIn,
    );
    response.status(200);
    response.send();
  }

  async OAuthLogin(request: ValidateOAuthRequest, response: Response) {
    if (!request) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const credential = await firstValueFrom(
      this.authClient.validateOAuth(request).pipe(
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

  async register(req: RegisterRequestDto) {
    return await firstValueFrom(
      this.authClient.register(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async logout(req: LogoutRequest) {
    return await firstValueFrom(
      this.authClient.logout(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async forgotPassword(req: ForgotPasswordRequest) {
    return await firstValueFrom(
      this.authClient.forgotPassword(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async resetPassword(req: ResetPasswordRequest) {
    return await firstValueFrom(
      this.authClient.resetPassword(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async getRefreshToken(req: Request, res: Response) {
    if (!req || !req.cookies['refreshToken']) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const refreshToken = req.cookies['refreshToken'];
    const newToken = await firstValueFrom(
      this.authClient.refreshToken({ refreshToken }).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );

    res.cookie('accessToken', newToken.newAccessToken);
    res.cookie('accessTokenExpiresIn', newToken.accessTokenExpiresIn);
    res.status(200);
    res.send();
  }
}
