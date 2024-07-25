import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { SchoolDTO } from '@shared/dtos';
import { School } from '@shared/entities';
import { SchoolRepository } from '@shared/repositories';

import { CreateSchoolRequestDTO } from './dtos/request.dto';
import { CreateSchoolResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateSchoolService {
  constructor(
    private i18nService: I18nService,
    private schoolRepository: SchoolRepository,
  ) {}

  async execute(
    schoolData: CreateSchoolRequestDTO,
  ): Promise<CreateSchoolResponseDTO> {
    const alreadyExists = await this.schoolRepository.findByName(
      schoolData.name,
    );

    if (alreadyExists) {
      throw new ConflictException({
        error: this.i18nService.translate('exceptions.error.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18nService.translate(
          'exceptions.message.CONFLICT_ENTITY',
          {
            lang: I18nContext.current().lang,
          },
        ),
      });
    }

    const savedSchoold = await this.schoolRepository.save(
      plainToClass(School, schoolData),
    );

    return plainToClass(SchoolDTO, savedSchoold);
  }
}
