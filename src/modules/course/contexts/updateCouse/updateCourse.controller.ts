import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { UserRole } from '@shared/enums/user';

import { UpdateCourseRequestDTO } from './dtos/request.dto';
import { UpdateCourseResponseDTO } from './dtos/response.dto';
import { UpdateCourseService } from './updateCourse.service';

@Roles(UserRole.ADMIN)
@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class UpdateCourseController {
  constructor(private updateCourseService: UpdateCourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course' })
  @ApiOkResponse({ type: UpdateCourseResponseDTO })
  @Patch(':courseId')
  async handler(
    @Param('courseId') courseId: number,
    @Body() courseData: UpdateCourseRequestDTO,
  ) {
    return this.updateCourseService.execute(courseId, courseData);
  }
}
