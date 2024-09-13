import { Module } from '@nestjs/common';

import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';
import { UpdateCourseController } from './contexts/updateCouse/updateCourse.controller';
import { UpdateCourseService } from './contexts/updateCouse/updateCourse.service';

@Module({
  imports: [],
  controllers: [CreateCourseController, UpdateCourseController],
  providers: [CreateCourseService, UpdateCourseService, CourseRepository],
})
export class CourseModule {}
