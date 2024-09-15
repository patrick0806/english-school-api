import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import env from '@config/env';

import { UserRepository } from '@shared/repositories';

import { ForgotPasswordController } from './contexts/forgotPassword/forgotPassword.controller';
import { ForgotPasswordService } from './contexts/forgotPassword/forgotPassword.service';
import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
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
  ],
  controllers: [
    LoginController,
    ResetPasswordController,
    ForgotPasswordController,
  ],
  providers: [
    LoginService,
    ResetPasswordService,
    ForgotPasswordService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
  ],
})
export class AuthModule {}
