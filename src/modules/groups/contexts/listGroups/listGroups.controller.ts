import { Controller, Get, Query, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';
import { IRequest } from '@shared/interfaces';

import { ListGroupsRequestDTO } from './dtos/request.dto';
import { ListGroupsResponseDTO } from './dtos/response.dto';
import { ListGroupsService } from './listGroups.service';

@ApiTags(API_TAGS.GROUP)
@Controller({ version: '1' })
export class ListGroupsController {
  constructor(private listGroupService: ListGroupsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'List courses' })
  @ApiResponse({
    status: 200,
    description: 'Students listed successfully',
    type: ListGroupsResponseDTO,
  })
  @Get()
  async handle(
    @Query() queryParams: ListGroupsRequestDTO,
    @Req() req: IRequest,
  ) {
    return this.listGroupService.execute(queryParams, req.user);
  }
}
