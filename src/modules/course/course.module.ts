import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';
import { DeleteCourseController } from './contexts/deleteCourse/deleteCourse.controller';
import { DeleteCourseService } from './contexts/deleteCourse/deleteCourse.service';
import { FindCourseByIdController } from './contexts/findCourseById/findCourseById.controller';
import { FindCourseByIdService } from './contexts/findCourseById/findCourseById.service';
import { ListCoursesController } from './contexts/listCourses/listCourses.controller';
import { ListCoursesService } from './contexts/listCourses/listCourses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [
    CreateCourseController,
    DeleteCourseController,
    ListCoursesController,
    FindCourseByIdController,
  ],
  providers: [
    CreateCourseService,
    DeleteCourseService,
    ListCoursesService,
    FindCourseByIdService,
    CourseRepository,
  ],
})
export class CourseModule {}
