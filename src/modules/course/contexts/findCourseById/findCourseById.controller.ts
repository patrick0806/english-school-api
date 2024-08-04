import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';

import { FindCourseByIdResponseDTO } from './dtos/response.dto';
import { FindCourseByIdService } from './findCourseById.service';

@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class FindCourseByIdController {
  constructor(private findCourseByIdService: FindCourseByIdService) {}

  @Get(':courseId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a course by Id' })
  @ApiOkResponse({
    description: 'Course found successfully',
    type: FindCourseByIdResponseDTO,
  })
  async handle(@Param('courseId') courseId: number) {
    return this.findCourseByIdService.execute(courseId);
  }
}
