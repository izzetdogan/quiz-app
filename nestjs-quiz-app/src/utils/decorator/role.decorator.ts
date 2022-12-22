import { UserRole } from 'src/user/entities/user.role';
import { SetMetadata } from '@nestjs/common';

export const Role = (...role: UserRole[]) => SetMetadata('role', role);
