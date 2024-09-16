import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import env from '@config/env';

import { MailModule } from '@shared/providers';
import { UserRepository } from '@shared/repositories';

import { ForgotPasswordController } from './contexts/forgotPassword/forgotPassword.controller';
import { ForgotPasswordService } from './contexts/forgotPassword/forgotPassword.service';
import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
import { RefreshTokenController } from './contexts/refreshToken/refreshToken.controller';
import { RefreshTokenService } from './contexts/refreshToken/refreshToken.service';
import { ResetPasswordController } from './contexts/resetPassword/resetPassword.controller';
import { ResetPasswordService } from './contexts/resetPassword/resetPassword.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: env().application.jwt.secrect,
      signOptions: { expiresIn: env().application.jwt.expiration },
    }),
    MailModule,
  ],
  controllers: [
    LoginController,
    RefreshTokenController,
    ResetPasswordController,
    ForgotPasswordController,
  ],
  providers: [
    LoginService,
    RefreshTokenService,
    ResetPasswordService,
    ForgotPasswordService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
  ],
})
export class AuthModule {}
