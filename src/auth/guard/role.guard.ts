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
    const requiredRole = this.reflector.getAllAndOverride<string>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(request.role);
    if (!requiredRole || requiredRole.length === 0) return true;

    return requiredRole.includes(request.role);
  }
}
