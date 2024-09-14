import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { UserRole } from '@shared/enums/user';

import { UpdateUserRequestDTO } from './dtos/request.dto';
import { UpdateUserResponseDTO } from './dtos/response.dto';
import { UpdateUserService } from './updateUser.service';

@Roles(UserRole.ADMIN)
@ApiTags(API_TAGS.USER)
@Controller({ version: '1' })
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UpdateUserResponseDTO })
  @Patch(':userId')
  async handler(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userData: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    return this.updateUserService.execute(userId, userData);
  }
}
