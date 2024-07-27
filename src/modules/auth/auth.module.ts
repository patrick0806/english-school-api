import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolMember } from '@shared/entities';
import { MailModule } from '@shared/providers';
import { SchoolMemberRepository } from '@shared/repositories';

import { ForgotPasswordController } from './contexts/forgotPassword/forgotPassword.controller';
import { ForgotPasswordService } from './contexts/forgotPassword/forgotPassword.service';
import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
import { RefreshTokenController } from './contexts/refreshToken/refreshToken.controller';
import { RefreshTokenService } from './contexts/refreshToken/refreshToken.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolMember]),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [
    LoginController,
    RefreshTokenController,
    ForgotPasswordController,
  ],
  providers: [
    LoginService,
    RefreshTokenService,
    ForgotPasswordService,
    LocalStrategy,
    JwtStrategy,
    SchoolMemberRepository,
  ],
})
export class AuthModule {}
