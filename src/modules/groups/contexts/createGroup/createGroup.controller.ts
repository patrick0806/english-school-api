import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { SchoolMemberRole } from '@shared/enums';

import { CreateGroupService } from './createGroup.service';
import { CreateGroupRequestDTO } from './dtos/request.dto';
import { CreateGroupResponseDTO } from './dtos/response.dto';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.GROUP)
@Controller({ version: '1' })
export class CreateGroupController {
  constructor(private createGroupService: CreateGroupService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiCreatedResponse({
    description: 'Group created successfully',
    type: CreateGroupResponseDTO,
  })
  @Post()
  async handle(
    @Body() groupData: CreateGroupRequestDTO,
  ): Promise<CreateGroupResponseDTO> {
    return this.createGroupService.execute(groupData);
  }
}
