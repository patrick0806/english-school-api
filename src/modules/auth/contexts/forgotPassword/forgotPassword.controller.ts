import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { ForgotPasswordRequestDTO } from './dtos/request.dto';
import { ForgotPasswordService } from './forgotPassword.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1', path: 'forgot-password' })
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @ApiOperation({ summary: 'Send an email to reset the password' })
  @Post()
  @HttpCode(204)
  async handle(
    @Body() { email, schoolId }: ForgotPasswordRequestDTO,
  ): Promise<void> {
    await this.forgotPasswordService.execute(email, schoolId);
  }
}
