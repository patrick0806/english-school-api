import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { SchoolMemberRepository } from '@shared/repositories';
import { hashPassword } from '@shared/utils';

@Injectable()
export class ResetPasswordService {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private jwtService: JwtService,
    private i18n: I18nService,
  ) {}

  async resetPassword(resetToken: string, password: string): Promise<void> {
    const schoolMemberId = this.decodeResetToken(resetToken);

    const schoolMember =
      await this.schoolMemberRepository.findById(schoolMemberId);
    if (!schoolMember) {
      throw new NotFoundException({
        error: this.i18n.translate('exceptions.error.NOT_FOUND_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.NOT_FOUND_ENTITY', {
          args: {
            entityName: 'School Member',
            propertyValue: schoolMemberId,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    schoolMember.password = await hashPassword(password);
    await this.schoolMemberRepository.save(schoolMember);
    //TODO send email to user about password reset
  }

  private decodeResetToken(resetToken: string): number {
    try {
      return this.jwtService.verify(resetToken).sub;
    } catch (error) {
      throw new BadRequestException({
        error: this.i18n.translate('exceptions.error.BAD_REQUEST', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.INVALID_RESET', {
          lang: I18nContext.current().lang,
        }),
      });
    }
  }
}
