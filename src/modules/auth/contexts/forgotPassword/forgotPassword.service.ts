import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { UserRepository } from '@shared/repositories';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    const restToken = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: env().application.jwt.refreshExpiration,
        secret: env().application.jwt.refreshSecret,
      },
    );

    console.log('resetToken->', restToken);
  }
}
