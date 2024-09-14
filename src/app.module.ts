import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import env from '@config/env';
import { databaseOptions } from '@config/typeorm';

import { JWTAuthGuard, RolesGuard } from '@shared/guards';

import { AuthModule } from '@modules/auth/auth.module';
import { CourseModule } from '@modules/course/course.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...databaseOptions }),
    HealthModule,
    AuthModule,
    CourseModule,
    UserModule,
    RouterModule.register([
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'courses',
        module: CourseModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JWTAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
