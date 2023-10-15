import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user_info = await this.authService.validateToken(
      request.cookies['accessToken'],
    );
    const requiredRole = this.reflector.getAllAndOverride<string>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (user_info.role == '' || user_info.userId == '') {
      return false;
    }
    request.userId = user_info.userId;
    request.role = user_info.role;

    if (!requiredRole || requiredRole.length === 0) return true;

    return requiredRole.includes(user_info.role);
  }
}
