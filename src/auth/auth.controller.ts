import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { RpcExceptionInterceptor } from '../common/rpc-exception.interceptor';
import { LoginRequestDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() req: LoginRequestDto) {
    return this.authService.login(req);
  }
}
