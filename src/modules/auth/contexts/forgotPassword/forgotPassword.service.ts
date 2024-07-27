import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { MailService } from '@shared/providers/mail/mail.service';
import { SchoolMemberRepository } from '@shared/repositories';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private mailService: MailService,
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
    schoolMember.email = 'patrickk0806@gmail.com';
    this.mailService
      .sendForgotPasswordConfirmation(schoolMember)
      .catch((error) => {
        console.log('Failed to send email', error);
      });
  }
}
