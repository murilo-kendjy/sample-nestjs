import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role, roles } from '../../decorators/roles.decorator.js';
import { IToken } from '../../resources/auth/entities/auth.entity.js';

@Injectable()
export class RolesGuard implements CanActivate {
  permsMap: Record<roles, roles[]> = {
    super_admin: ['user', 'admin', 'super_admin'],
    admin: ['user', 'admin'],
    user: ['user'],
  };

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { __user }: { __user: IToken } = context.switchToHttp().getRequest();

    const roles = __user.role ? this.permsMap[__user.role] : undefined;

    return requiredRoles.some((role) => roles?.includes(role));
  }
}
