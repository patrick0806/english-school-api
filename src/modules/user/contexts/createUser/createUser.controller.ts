import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { UserDTO } from '@shared/dtos';
import { UserRole } from '@shared/enums/user';

import { CreateUserService } from './createuser.service';
import { CreateUserRequestDTO } from './dtos/request.dto';
import { CreateUserResponsetDTO } from './dtos/response.dto';

@Roles(UserRole.ADMIN)
@ApiTags(API_TAGS.USER)
@Controller({ version: '1' })
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserDTO })
  @Post()
  async handler(
    @Body() userData: CreateUserRequestDTO,
  ): Promise<CreateUserResponsetDTO> {
    return this.createUserService.execute(userData);
  }
}
