import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from 'src/user/role.respository';

import { UsersRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJwt } from './strategy/access.strategy';
import { RefreshJwt } from './strategy/refresh.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessJwt,
    RefreshJwt,
    UsersRepository,
    UserService,
    RoleRepository,
  ],
})
export class AuthModule {}
