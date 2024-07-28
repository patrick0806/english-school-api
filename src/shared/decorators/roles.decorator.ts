import { SetMetadata } from '@nestjs/common';

import { SchoolMemberRole } from '../enums/index';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: SchoolMemberRole[]) =>
  SetMetadata(ROLES_KEY, roles);
