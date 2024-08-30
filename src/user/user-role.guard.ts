import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from './user-role.decorator';
import UserReadModel from './domain/read-models/user.read.model';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    if (!request.isAuthenticated || !request.isAuthenticated()) return false;

    const user = request.user as UserReadModel;
    const requiredRoles = [
      ...(this.reflector.get(Roles, context.getClass()) || []),
      ...(this.reflector.get(Roles, context.getHandler()) || []),
    ];
    if (!requiredRoles) return true;

    return requiredRoles.every((role) => user.roles.includes(role));
  }
}
