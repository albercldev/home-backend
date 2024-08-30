import { Reflector } from '@nestjs/core';
import { Role } from './domain/enums/role.enum';

export const Roles = Reflector.createDecorator<Role[]>();
