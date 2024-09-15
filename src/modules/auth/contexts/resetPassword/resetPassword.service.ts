import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { UserRepository } from '@shared/repositories';
import { HashUtils } from '@shared/utils';

import { ResetPasswordRequestDTO } from './dtos/request.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    resetToken,
    password,
  }: ResetPasswordRequestDTO): Promise<void> {
    const payload = this.jwtService.verify(resetToken, {
      secret: env().application.jwt.refreshSecret,
    });

    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new NotFoundException({
        error: 'Not Found',
        message: 'User not found',
      });
    }
    user.password = HashUtils.generateHash(password);
    await this.userRepository.save(user);
  }
}
