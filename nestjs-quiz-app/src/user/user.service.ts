import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/utils/exception/UserNotFound.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RoleRepository } from './role.respository';
import { UsersRepository } from './user.repository';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserRole } from './entities/user.role';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepo: RoleRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, firstname, lastname } = createUserDto;
    const user = new User();
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = await this.hashPassword(password);

    const find = await this.userRepository.findByEmail(email);
    if (find) throw new HttpException('User must be uniqu', 500);

    const saveOne = this.userRepository.save(user);

    return saveOne;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.findById(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roleId } = updateUserDto;
    const user = await this.findById(id);

    // const role = await this.roleRepo.findOneBy({ id: roleId });

    // if (!role) {
    //   throw new HttpException('Hata', 400);
    // }

    if (roleId === 1) user.role = UserRole.ADMIN;
    else if (roleId === 2) user.role = UserRole.NORMAL;
    else throw new HttpException('There is no rol', 400);
    // await user.roles.map((r) => {
    //   if (r.id === role.id) throw new HttpException('Hatat', 400);
    // });

    // user.roles.push(role);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    this.userRepository.remove(user);
    return user;
  }

  private async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new UserNotFoundException('User not Found', 400);
    }
    return user;
  }

  private async hashPassword(data: string) {
    return await bcrypt.hash(data, 10);
  }
}
