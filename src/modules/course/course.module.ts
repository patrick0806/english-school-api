import { Module } from '@nestjs/common';

import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from './contexts/createCourse/createCourse.controller';
import { CreateCourseService } from './contexts/createCourse/createCourse.service';
import { FindCourseByIdController } from './contexts/findCourseById/findCourseById.controller';
import { FindCourseByIdService } from './contexts/findCourseById/findCourseById.service';
import { ListCourseController } from './contexts/listCourse/listCourse.controller';
import { ListCourseService } from './contexts/listCourse/listCourse.service';
import { UpdateCourseController } from './contexts/updateCouse/updateCourse.controller';
import { UpdateCourseService } from './contexts/updateCouse/updateCourse.service';

@Module({
  imports: [],
  controllers: [
    ListCourseController,
    FindCourseByIdController,
    CreateCourseController,
    UpdateCourseController,
  ],
  providers: [
    ListCourseService,
    FindCourseByIdService,
    CreateCourseService,
    UpdateCourseService,
    CourseRepository,
  ],
})
export class CourseModule {}
