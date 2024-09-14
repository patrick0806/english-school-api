import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';

import { ListCourseRequestDTO } from './dtos/request.dto';
import { ListCourseResponseDTO } from './dtos/response.dto';
import { ListCourseService } from './listCourse.service';

@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class ListCourseController {
  constructor(private listCourseService: ListCourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'List courses' })
  @ApiOkResponse({ type: ListCourseResponseDTO })
  @Get()
  async handler(@Query() query: ListCourseRequestDTO) {
    return this.listCourseService.execute(query);
  }
}
