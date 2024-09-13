import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';

import { FindCourseByIdResponseDTO } from './dtos/response.dto';
import { FindCourseByIdService } from './findCourseById.service';

@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class FindCourseByIdController {
  constructor(private findCourseByIdService: FindCourseByIdService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find course by id' })
  @ApiOkResponse({ type: FindCourseByIdResponseDTO })
  @Get(':courseId')
  async handler(@Param('courseId') courseId: number) {
    return this.findCourseByIdService.execute(courseId);
  }
}
