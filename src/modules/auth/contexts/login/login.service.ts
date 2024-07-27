import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { env } from '@config/env';

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
    const schoolMember = await this.localStrategy.validate(
      loginData.email,
      loginData.password,
    );

    const payload = {
      email: schoolMember.email,
      schoolId: schoolMember.school.id,
      role: schoolMember.role,
      sub: schoolMember.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: env.JWT_EXPIRATION,
        secret: env.JWT_SECRET,
      }),
      refreshToken: this.jwtService.sign(
        { sub: schoolMember.id },
        {
          expiresIn: env.JWT_REFRESH_EXPIRATION,
          secret: env.JWT_REFRESH_SECRET,
        },
      ),
      tokenType: 'Bearer',
    };
  }
}
