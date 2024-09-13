import { Injectable } from '@nestjs/common';
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
    const course = plainToClass(Course, courseData);
    const result = await this.courseRepository.save(course);
    return plainToClass(CreateCourseResponseDTO, result);
  }
}
