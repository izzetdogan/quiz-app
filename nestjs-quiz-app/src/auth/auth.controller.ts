import { Controller, Get, UseGuards } from '@nestjs/common';
import { Body, Delete, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './response/tokens';
import { RefreshGuard } from '../utils/guard/refresh.guard';
import { CurrentUser } from '../utils/decorator/current.user';
import { PublicGuard } from '../utils/decorator/public.decorator';
import { ApplyUser } from 'src/utils/guard/get-me.guard';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicGuard()
  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @PublicGuard()
  @Post('signin')
  signIn(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Delete('logout')
  logout(@CurrentUser('sub') userId: number) {
    return this.authService.logout(userId);
  }
  @PublicGuard()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  refreshToken(
    @CurrentUser('refreshToken') refreshToken: string,
    @CurrentUser('sub') userId: number,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Get('me')
  @UseGuards(ApplyUser)
  me(@CurrentUser('sub') userId: number) {
    return this.authService.getMe(userId);
  }

  // @Get('me')
  // @UseGuards(ApplyUser)
  // me(@CurrentUser() user: User) {
  //   return { user };
  // }
}
