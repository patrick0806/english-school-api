import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { SchoolMemberRole } from '@shared/enums';

import { DeleteGroupService } from './deleteGroup.service';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.GROUP)
@Controller({ version: '1' })
export class DeleteGroupController {
  constructor(private service: DeleteGroupService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a group' })
  @ApiNoContentResponse({ description: 'Group deleted with success' })
  async handle(@Param('id') id: number): Promise<void> {
    await this.service.execute(id);
  }
}
