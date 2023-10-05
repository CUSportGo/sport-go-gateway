import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { GoogleUser, LogoutRequest, ResetPasswordRequest, ValidateGoogleRequest } from './auth.pb';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() req: LoginRequestDto) {
    return this.authService.login(req);
  }

  @Post('register')
  register(@Body() req: RegisterRequestDto) {
    return this.authService.register(req);
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth() { }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRediect(@Req() request: Request, @Res() response: Response) {
    const validateRequest: ValidateGoogleRequest = {
      user: request.user as GoogleUser,
    };
    return this.authService.googleLogin(validateRequest, response);
  }

  @Put('resetPassword/:accessToken')
  resetPassword(@Body('password') password: string, @Param('accessToken') accessToken: string) {

    const request: ResetPasswordRequest = {
      accessToken: accessToken,
      password: password,
    }
    return this.authService.resetPassword(request);
  }


}
