import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { UserRepository } from '@shared/repositories';

import { RefreshTokenResponseDTO } from './dtos/response.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    const decodedToken = this.jwtService.verify(refreshToken, {
      secret: env().application.jwt.refreshSecret,
    });

    const user = await this.userRepository.findByEmail(decodedToken.id);

    const tokenPayload = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(tokenPayload, {
        expiresIn: env().application.jwt.expiration,
        secret: env().application.jwt.secrect,
      }),
      refreshToken: this.jwtService.sign(
        { id: tokenPayload.id, role: tokenPayload.role },
        {
          expiresIn: env().application.jwt.refreshExpiration,
          secret: env().application.jwt.refreshSecret,
        },
      ),
    };
  }
}
