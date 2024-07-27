import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Strategy } from 'passport-local';

import { SchoolMember } from '@shared/entities';
import { SchoolMemberRepository } from '@shared/repositories';
import { comparePassword } from '@shared/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private i18n: I18nService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<SchoolMember> {
    const schoolMember = await this.schoolMemberRepository.findByEmail(email);

    if (
      !schoolMember ||
      schoolMember.isActive === false ||
      schoolMember.school.isActive === false
    ) {
      throw new UnauthorizedException({
        error: this.i18n.t('exceptions.error.UNAUTHORIZED', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.t('exceptions.message.INVALID_CREDENTIALS', {
          lang: I18nContext.current().lang,
        }),
      });
    }

    const isPasswordValid = comparePassword(password, schoolMember.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        error: this.i18n.t('exceptions.error.UNAUTHORIZED', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.t('exceptions.message.INVALID_CREDENTIALS', {
          lang: I18nContext.current().lang,
        }),
      });
    }
    return schoolMember;
  }
}
