import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';

import { FindGroupByIdResponseDTO } from './dtos/response.dto';
import { FindGroupByIdService } from './findGroupById.service';

@ApiTags(API_TAGS.GROUP)
@Controller({ version: '1' })
export class FindGroupByIdController {
  constructor(private findGroupByIdService: FindGroupByIdService) {}

  @Get(':groupId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a group by Id' })
  @ApiOkResponse({
    description: 'Group found successfully',
    type: FindGroupByIdResponseDTO,
  })
  async handle(@Param('groupId') groupId: number) {
    return this.findGroupByIdService.execute(groupId);
  }
}
