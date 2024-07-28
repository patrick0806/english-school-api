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

import { CreateCourseService } from './createCourse.service';
import { CreateCourseRequestDTO } from './dtos/request.dto';
import { CreateCourseResponseDTO } from './dtos/response.dto';

@Roles(SchoolMemberRole.ADMIN)
@ApiTags(API_TAGS.COURSE)
@Controller({ version: '1' })
export class CreateCourseController {
  constructor(private readonly createCourseService: CreateCourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiCreatedResponse({
    description: 'Course created successfully',
    type: CreateCourseResponseDTO,
  })
  @Post()
  async handle(
    @Body() courseData: CreateCourseRequestDTO,
  ): Promise<CreateCourseResponseDTO> {
    return this.createCourseService.execute(courseData);
  }
}
