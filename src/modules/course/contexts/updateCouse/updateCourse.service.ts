import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CourseRepository } from '@shared/repositories';

import { UpdateCourseRequestDTO } from './dtos/request.dto';
import { UpdateCourseResponseDTO } from './dtos/response.dto';

@Injectable()
export class UpdateCourseService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(
    courseId: number,
    courseNewData: UpdateCourseRequestDTO,
  ): Promise<UpdateCourseResponseDTO> {
    const course = await this.courseRepository.findById(courseId);

    if (!course)
      throw new NotFoundException({
        error: 'Not found',
        message: `Not found course with id: ${courseId}`,
      });

    Object.assign(course, courseNewData);
    const result = await this.courseRepository.save(course);
    return plainToClass(UpdateCourseResponseDTO, result);
  }
}
