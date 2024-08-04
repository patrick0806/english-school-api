import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CourseDTO } from '@shared/dtos';
import { IDecodedToken } from '@shared/interfaces';
import { CourseRepository } from '@shared/repositories';

import { ListCoursesRequestDTO } from './dtos/request.dto';
import { ListCoursesResponseDTO } from './dtos/response.dto';

@Injectable()
export class ListCoursesService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(
    { page, pageSize, name }: ListCoursesRequestDTO,
    user: IDecodedToken,
  ): Promise<ListCoursesResponseDTO> {
    const { content, totalElements } = await this.courseRepository.find(
      {
        page,
        pageSize,
      },
      user.schoolId,
      name,
    );
    return {
      page,
      pageSize,
      totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      content: content.map((course) => plainToClass(CourseDTO, course)),
    };
  }
}
