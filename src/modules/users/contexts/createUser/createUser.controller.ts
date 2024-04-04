import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { Public } from '@shared/decorators/public.decorator';

import { CreateUserService } from './createUser.service';

@ApiTags(API_TAGS.USERS)
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @Public()
  async handle() {
    await this.createUserService.execute();
  }
}
