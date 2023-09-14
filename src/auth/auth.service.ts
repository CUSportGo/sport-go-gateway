import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClientImpl } from '../proto/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClientImpl;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authClient =
      this.client.getService<AuthServiceClientImpl>('AuthService');
  }

  login(req: any) {
    return this.authClient.Login(req);
  }
}
