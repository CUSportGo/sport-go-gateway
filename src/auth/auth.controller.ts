import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, response, Response } from 'express';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { GoogleUser, LogoutRequest, ValidateGoogleRequest } from './auth.pb';
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
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRediect(@Req() request: Request, @Res() response: Response) {
    const validateRequest: ValidateGoogleRequest = {
      user: request.user as GoogleUser,
    };
    return this.authService.googleLogin(validateRequest, response);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {}

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() request: Request, @Res() response: Response) {
    return {
      statusCode: HttpStatus.OK,
      data: request.user,
    };
  }

  @Post('logout')
  logout(@Body() req: LogoutRequest) {
    return this.authService.logout(req);
  }
}
