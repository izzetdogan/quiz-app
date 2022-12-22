import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { RoleRepository } from './role.respository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository, RoleRepository],
})
export class UserModule {}
