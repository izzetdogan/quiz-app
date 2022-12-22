import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.role';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    const res: any = requiredRole.some((role) => user.role?.includes(role));

    if (!res) {
      throw new UnauthorizedException('dwdd');
    }

    return res;
  }
}
