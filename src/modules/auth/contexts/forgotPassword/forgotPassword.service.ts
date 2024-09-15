import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { MailService } from '@shared/providers/mail/mail.service';
import { UserRepository } from '@shared/repositories';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailService: MailService,
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

    this.mailService
      .sendForgotPasswordConfirmation(user, restToken)
      .catch((error) => {
        console.error('Fail to send fortgot password email', error);
      });
  }
}
