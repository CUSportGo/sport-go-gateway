import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { map } from 'rxjs';
import { LoginRequestDto } from './auth.dto';
import {
  AuthServiceClient,
  ValidateGoogleRequest,
  ValidateGoogleResponse,
} from './auth.pb';

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
