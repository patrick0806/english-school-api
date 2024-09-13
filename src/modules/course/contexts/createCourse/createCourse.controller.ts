import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Roles } from '@shared/decorators';
import { UserRole } from '@shared/enums/user';

import { CreateCourseService } from './createCourse.service';
import { CreateCourseRequestDTO } from './dtos/request.dto';
import { CreateCourseResponseDTO } from './dtos/response.dto';

@ApiTags(API_TAGS.COURSE)
@Roles(UserRole.ADMIN)
@Controller({ version: '1' })
export class CreateCourseController {
  constructor(private createCourseService: CreateCourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiCreatedResponse({
    type: CreateCourseResponseDTO,
    description: 'Course created successfully',
  })
  @Post()
  async handler(
    @Body() courseData: CreateCourseRequestDTO,
  ): Promise<CreateCourseResponseDTO> {
    return this.createCourseService.execute(courseData);
  }
}
