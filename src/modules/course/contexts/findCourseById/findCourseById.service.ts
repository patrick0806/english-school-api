import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CourseRepository } from '@shared/repositories';

import { FindCourseByIdResponseDTO } from './dtos/response.dto';

@Injectable()
export class FindCourseByIdService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(courseId: number): Promise<FindCourseByIdResponseDTO> {
    const course = await this.courseRepository.findById(courseId);
    if (!course)
      throw new NotFoundException({
        error: 'Not found',
        message: `Not found course with id: ${courseId}`,
      });
    return plainToClass(FindCourseByIdResponseDTO, course);
  }
}
