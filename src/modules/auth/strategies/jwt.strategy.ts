import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import env from '@config/env';

import { UserRole } from '@shared/enums/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env().application.jwt.secrect,
    });
  }

  async validate(payload: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
  }) {
    return payload;
  }
}
