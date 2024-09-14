import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CourseDTO } from '@shared/dtos';
import { CourseRepository } from '@shared/repositories';

import { ListCourseRequestDTO } from './dtos/request.dto';

@Injectable()
export class ListCourseService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(query: ListCourseRequestDTO) {
    const result = await this.courseRepository.findAll({
      page: query.page,
      pageSize: query.pageSize,
    });

    return {
      ...result,
      content: result.content.map((course) => plainToClass(CourseDTO, course)),
    };
  }
}
