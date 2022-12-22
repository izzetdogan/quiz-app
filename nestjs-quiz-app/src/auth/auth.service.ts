import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/user/user.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './response/tokens';
import { JwtService } from '@nestjs/jwt/dist';
import { UserNotFoundException } from 'src/utils/exception/UserNotFound.exception';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/entities/user.role';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UsersRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async hashPassword(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async signUp(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.create(dto);
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async signIn(dto: LoginDto): Promise<Tokens> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UserNotFoundException('user not found', 400);
    }
    const passControl = await bcrypt.compare(dto.password, user.password);

    if (!passControl) {
      throw new ForbiddenException('Acces denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
  async logout(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    user.refreshToken = null;
    user.save();
    return user;
  }
  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundException('user not found', 400);
    }

    const refreshControl = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshControl) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getMe(id: number) {
    return await this.userService.findOne(id);
  }

  // Token

  async getTokens(
    userId: number,
    email: string,
    role: UserRole,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: 'accestoken-secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: 'refreshtoken-secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const user = await this.userRepo.findOneBy({
      id: userId,
    });
    user.refreshToken = await this.hashPassword(rt);
    await this.userRepo.save(user);
  }
}
