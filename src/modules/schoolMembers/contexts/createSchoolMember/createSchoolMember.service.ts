import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { SchoolMember } from '@shared/entities';
import { SchoolMemberRepository, SchoolRepository } from '@shared/repositories';
import { hashPassword, onlyNumbers } from '@shared/utils';

import { CreateSchoolMemberRequestDTO } from './dtos/request.dto';
import { CreateSchoolMemberResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateSchoolMemberService {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private schoolRepository: SchoolRepository,
    private i18n: I18nService,
  ) {}

  async execute(
    schoolMemberData: CreateSchoolMemberRequestDTO,
  ): Promise<CreateSchoolMemberResponseDTO> {
    const schoolId = schoolMemberData.school.id;
    const school = await this.schoolRepository.findById(schoolId);

    if (!school) {
      throw new NotFoundException({
        error: this.i18n.translate('exceptions.error.NOT_FOUND_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.NOT_FOUND_ENTITY', {
          args: {
            entityName: 'School',
            propertyValue: schoolMemberData.school.id,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const schoolMemberExists = await this.schoolMemberRepository.findByEmail(
      schoolMemberData.email,
    );

    if (schoolMemberExists) {
      throw new ConflictException({
        error: this.i18n.translate('exceptions.error.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.CONFLICT_ENTITY', {
          args: {
            entityName: 'School Member',
            propertyValue: schoolMemberData.email,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const totalSchoolMembers =
      await this.schoolMemberRepository.countSchoolMembers(schoolId);

    const schoolMember = plainToClass(SchoolMember, schoolMemberData);
    const schoolMemberCode = this.generateSchoolMemberCode(
      totalSchoolMembers,
      school.name,
      schoolMember,
    );

    schoolMember.userCode = schoolMemberCode;
    schoolMember.password = await hashPassword(schoolMember.password || 'temp'); //TODO change temp
    schoolMember.phoneNumber = onlyNumbers(schoolMember.phoneNumber);

    const savedSchoolMember =
      await this.schoolMemberRepository.save(schoolMember);

    return plainToClass(CreateSchoolMemberResponseDTO, savedSchoolMember);
  }

  private generateSchoolMemberCode(
    totalSchoolMembers: number,
    schoolName: string,
    schoolMember: SchoolMember,
  ): string {
    //TODO back when have course name too
    const schoolNameFirstLetter = schoolName.charAt(0).toUpperCase();
    const roleFirstLetter = schoolMember.role.charAt(0).toUpperCase();
    const shortName = schoolMember.name
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();

    let usersNumber: string;
    totalSchoolMembers += 1;
    if (totalSchoolMembers < 10) {
      usersNumber = `000${totalSchoolMembers}`;
    } else if (totalSchoolMembers < 100) {
      usersNumber = `00${totalSchoolMembers}`;
    } else if (totalSchoolMembers < 1000) {
      usersNumber = `0${totalSchoolMembers}`;
    } else {
      usersNumber = `${totalSchoolMembers}`;
    }

    return `${schoolNameFirstLetter}-${usersNumber}-${shortName}${roleFirstLetter}`;
  }
}
