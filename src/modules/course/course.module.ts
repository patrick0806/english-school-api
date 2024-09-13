import { Module } from '@nestjs/common';

import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';

@Module({
  imports: [],
  controllers: [CreateCourseController],
  providers: [CreateCourseService, CourseRepository],
})
export class CourseModule {}
