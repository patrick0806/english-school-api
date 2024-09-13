import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { LocalStrategy } from '@modules/auth/strategies/local.strategy';

import { LoginRequestDTO } from './dtos/request.dto';
import { LoginResponseDTO } from './dtos/response.dto';

@Injectable()
export class LoginService {
  constructor(
    private localStrategy: LocalStrategy,
    private jwtService: JwtService,
  ) {}
  async execute(loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.localStrategy.validate(
      loginData.email,
      loginData.password,
    );

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
        {
          expiresIn: env().application.jwt.expiration,
          secret: env().application.jwt.secrect,
        },
      ),
      refreshToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: env().application.jwt.refreshExpiration,
          secret: env().application.jwt.refreshSecret,
        },
      ),
    };
  }
}
