import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CreateCourseController],
  providers: [CreateCourseService, CourseRepository],
})
export class CourseModule {}
