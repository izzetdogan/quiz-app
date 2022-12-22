import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AccessJwt extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'accestoken-secret',
    });
  }
  async validate(payload: JwtPayload) {
    return payload;
  }
}
