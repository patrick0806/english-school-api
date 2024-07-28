import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseRequestDTO } from './dtos/request.dto';
import { CreateCourseResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateCourseService {
  constructor(
    private courseRepository: CourseRepository,
    private i18n: I18nService,
  ) {}

  async execute(
    courseData: CreateCourseRequestDTO,
  ): Promise<CreateCourseResponseDTO> {
    const alreadyExistsCourse = await this.courseRepository.findByName(
      courseData.name,
      courseData.school.id,
    );

    if (alreadyExistsCourse) {
      throw new ConflictException({
        error: this.i18n.translate('exceptions.error.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.CONFLICT_ENTITY', {
          args: {
            entityName: 'Course',
            propertyValue: courseData.name,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const course = await this.courseRepository.save(
      plainToClass(Course, courseData),
    );
    return plainToClass(CreateCourseResponseDTO, course);
  }
}
