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
import { GoogleUser, ValidateGoogleRequest } from './auth.pb';
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
    return this.authService.login(req);
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
}
