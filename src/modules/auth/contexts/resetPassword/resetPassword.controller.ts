import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { ResetPasswordRequestDTO } from './dtos/request.dto';
import { ResetPasswordService } from './resetPassword.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1' })
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @ApiOperation({ summary: 'Reset Password' })
  @ApiNoContentResponse()
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(@Body() resetData: ResetPasswordRequestDTO): Promise<void> {
    return this.resetPasswordService.execute(resetData);
  }
}
