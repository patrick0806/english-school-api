import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseRequestDTO } from './dtos/request.dto';
import { CreateCourseResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateCourseService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(
    courseData: CreateCourseRequestDTO,
  ): Promise<CreateCourseResponseDTO> {
    const courseExists = await this.courseRepository.findByName(
      courseData.name,
    );

    if (courseExists) {
      throw new ConflictException({
        error: 'Conflict',
        message: 'Course already exists',
      });
    }
    const course = plainToClass(Course, courseData);
    const result = await this.courseRepository.save(course);
    return plainToClass(CreateCourseResponseDTO, result);
  }
}
