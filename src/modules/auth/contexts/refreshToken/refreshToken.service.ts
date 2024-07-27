import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { env } from '@config/env';

import { IDecodedRefreshToken, IDecodedToken } from '@shared/interfaces';
import { SchoolMemberRepository } from '@shared/repositories';

import { RefreshTokenResponseDTO } from './dtos/response.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    private schoolMemberRepository: SchoolMemberRepository,
    private jwtService: JwtService,
    private i18n: I18nService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    const schoolMemberId = this.jwtService.verify<IDecodedRefreshToken>(
      refreshToken,
      { secret: env.JWT_REFRESH_SECRET },
    ).sub;

    const schoolMember =
      await this.schoolMemberRepository.findById(schoolMemberId);
    if (
      (!schoolMember || schoolMember.isActive === false,
      schoolMember.school.isActive === false)
    ) {
      throw new UnauthorizedException({
        error: this.i18n.translate('exceptions.error.UNAUTHORIZED', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.INVALID_TOKEN', {
          args: {
            entityName: 'School Member',
            propertyValue: schoolMember.email,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const payload: IDecodedToken = {
      email: schoolMember.email,
      schoolId: schoolMember.school.id,
      role: schoolMember.role,
      sub: schoolMember.id,
    };

    const refreshTokenPayload: IDecodedRefreshToken = {
      sub: schoolMember.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: env.JWT_EXPIRATION,
        secret: env.JWT_SECRET,
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: env.JWT_REFRESH_EXPIRATION,
        secret: env.JWT_REFRESH_SECRET,
      }),
      tokenType: 'Bearer',
    };
  }
}
