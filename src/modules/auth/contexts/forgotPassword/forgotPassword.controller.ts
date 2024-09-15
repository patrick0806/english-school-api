import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { ForgotPasswordRequestDTO } from './dtos/request.dto';
import { ForgotPasswordService } from './forgotPassword.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1' })
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @ApiOperation({ summary: 'Forgot Password' })
  @ApiNoContentResponse()
  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(@Body() { email }: ForgotPasswordRequestDTO): Promise<void> {
    return this.forgotPasswordService.execute(email);
  }
}
