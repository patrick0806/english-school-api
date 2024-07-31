import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';
import { DeleteCourseController } from './contexts/deleteCourse/deleteCourse.controller';
import { DeleteCourseService } from './contexts/deleteCourse/deleteCourse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CreateCourseController, DeleteCourseController],
  providers: [CreateCourseService, DeleteCourseService, CourseRepository],
})
export class CourseModule {}
