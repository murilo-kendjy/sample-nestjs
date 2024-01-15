import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IToken } from '../../resources/auth/entities/auth.entity.js';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const __user: IToken = request.__user;
    const { id } = request.params;

    if (__user.role === 'user' && id !== __user.sub) {
      return false;
    }

    return true;
  }
}
