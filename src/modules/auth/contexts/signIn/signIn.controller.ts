import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { Public } from '@shared/decorators/public.decorator';
import { UserRepository } from '@shared/repositories/user.repository';

import { SignInRequestDTO } from './dto/request.dto';

@ApiTags(API_TAGS.AUTH)
@Controller({ path: 'sign-in', version: '1' })
export class SignInController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @Public()
  async handler(@Body() loginData: SignInRequestDTO) {
    return loginData;
  }
}
