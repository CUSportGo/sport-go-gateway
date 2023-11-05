import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response, response } from 'express';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import {
  ForgotPasswordRequest,
  LogoutRequest,
  OAuthUser,
  ResetPasswordRequest,
  ValidateOAuthRequest,
} from './auth.pb';
import { AuthService } from './auth.service';
import { Roles } from './guard/role.decorator';
import { RoleGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() req: LoginRequestDto, @Res() response: Response) {
    return this.authService.login(req, response);
  }
  @Post('register')
  register(@Body() req: RegisterRequestDto) {
    return this.authService.register(req);
  }

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

  @Put('resetPassword')
  resetPassword(
    @Body('password') password: string,
    @Body('accessToken') accessToken: string,
  ) {
    const request: ResetPasswordRequest = {
      accessToken: accessToken,
      password: password,
    };
    return this.authService.resetPassword(request);
  }

  @Post('logout')
  logout(@Req() request: any, @Res() response: Response) {
    const accessToken = request.cookies['accessToken'];
    return this.authService.logout({ accessToken }, response);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() req: ForgotPasswordRequest) {
    return this.authService.forgotPassword(req);
  }

  @Post('refreshToken')
  refreshToken(@Req() request: Request, @Res() response: Response) {
    return this.authService.getRefreshToken(request, response);
  }
}
