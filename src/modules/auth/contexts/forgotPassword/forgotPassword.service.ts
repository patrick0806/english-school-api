import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { env } from '@config/env';

import { MailService } from '@shared/providers/mail/mail.service';
import { SchoolMemberRepository } from '@shared/repositories';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private mailService: MailService,
    private jwtService: JwtService,
    private i18n: I18nService,
  ) {}

  async execute(email: string, schoolId: number): Promise<void> {
    const schoolMember = await this.schoolMemberRepository.findByEmail(
      email,
      schoolId,
    );

    if (!schoolMember) {
      throw new NotFoundException({
        error: this.i18n.translate('exceptions.error.NOT_FOUND_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.NOT_FOUND_ENTITY', {
          args: {
            entityName: 'School Member',
            propertyValue: email,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const payload = {
      sub: schoolMember.id,
    };

    const resetPasswordToken = this.jwtService.sign(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '1d',
    });

    this.mailService
      .sendForgotPasswordConfirmation(schoolMember, resetPasswordToken)
      .catch((error) => {
        console.log('Failed to send email', error);
      });
  }
}
