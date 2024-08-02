import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';

import { DeleteGroupService } from './deleteGroup.service';

@ApiTags(API_TAGS.GROUP)
@Controller({ version: '1' })
export class DeleteGroupController {
  constructor(private service: DeleteGroupService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a group' })
  @ApiNoContentResponse({ description: 'Group deleted with success' })
  async handle(@Param('id') id: number): Promise<void> {
    await this.service.execute(id);
  }
}
