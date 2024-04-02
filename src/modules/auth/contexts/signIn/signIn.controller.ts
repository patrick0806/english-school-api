import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { Public } from '@shared/decorators/public.decorator';
import { UserRepository } from '@shared/repositories/user.repository';

@ApiTags(API_TAGS.USERS)
@Controller({ path: 'sign-in', version: '1' })
export class SignInController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @Public()
  async handler() {
    return this.userRepository.save({
      name: 'batata',
      email: 'X6l6j@example.com',
    });
  }

  @Get()
  @Public()
  async show() {
    const data = await this.userRepository.findByEmail('X6l6j@example.com');
    return {
      data,
      message: 'User found',
    };
  }
}
