import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants/apiTags';

import { DeleteCourseService } from './deleteCourse.service';

@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class DeleteCourseController {
  constructor(private deleteCourseService: DeleteCourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a course' })
  @ApiNoContentResponse({ description: 'Course deleted successfully' })
  @Delete(':courseId')
  @HttpCode(204)
  async handle(@Param('courseId') courseId: number): Promise<void> {
    return this.deleteCourseService.execute(courseId);
  }
}
