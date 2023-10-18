import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req, res: Response, next: NextFunction) {
    const user_info = await this.authService.validateToken(
      req.cookies['accessToken'],
    );

    req.userId = user_info.userId;
    req.role = user_info.role;
    next();
  }
}
