import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { SchoolDTO } from '@shared/dtos';
import { SchoolRepository } from '@shared/repositories';

@Injectable()
export class DisableSchoolService {
  constructor(
    private schoolRepository: SchoolRepository,
    private i18n: I18nService,
  ) {}

  async execute(schoolId: number): Promise<SchoolDTO> {
    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new NotFoundException({
        error: this.i18n.translate('exceptions.error.NOT_FOUND_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.NOT_FOUND_ENTITY', {
          args: { entityName: 'School', propertyValue: schoolId },
          lang: I18nContext.current().lang,
        }),
      });
    }
    school.isActive = false;

    const updatedSchool = await this.schoolRepository.save(school);

    return plainToClass(SchoolDTO, updatedSchool);
  }
}
