import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { LogoutRequest, OAuthUser, ValidateOAuthRequest } from './auth.pb';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() req: LoginRequestDto) {
    return this.authService.login(req);
  }

  @Post('register')
  register(@Body() req: RegisterRequestDto) {
    return this.authService.register(req);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRediect(@Req() request: Request, @Res() response: Response) {
    const validateRequest: ValidateOAuthRequest = {
      user: request.user as OAuthUser,
      type: 'google',
    };
    return this.authService.OAuthLogin(validateRequest, response);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {}

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() request: Request, @Res() response: Response) {
    const validateRequest: ValidateOAuthRequest = {
      user: request.user as OAuthUser,
      type: 'facebook',
    };
    return this.authService.OAuthLogin(validateRequest, response);
  }

  @Post('logout')
  logout(@Body() req: LogoutRequest) {
    return this.authService.logout(req);
  }
}
