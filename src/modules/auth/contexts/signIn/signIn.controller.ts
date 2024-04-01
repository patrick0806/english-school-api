import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';

@ApiTags(API_TAGS.USERS)
@Controller({ path: 'sign-in', version: '1' })
export class SignInController {
  @Post()
  async handler() {
    return null;
  }
}
