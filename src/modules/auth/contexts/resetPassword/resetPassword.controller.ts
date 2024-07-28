import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { ResetPasswordRequestDTO } from './dtos/request.dto';
import { ResetPasswordService } from './resetPassword.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1', path: 'reset-password' })
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ description: 'Password reset successfully' })
  @Patch()
  async handle(
    @Body() { password, resetToken }: ResetPasswordRequestDTO,
  ): Promise<void> {
    return this.resetPasswordService.resetPassword(resetToken, password);
  }
}
