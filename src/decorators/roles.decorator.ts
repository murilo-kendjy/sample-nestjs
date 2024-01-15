import { SetMetadata } from '@nestjs/common';

export type roles = 'super_admin' | 'admin' | 'user';

export enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
