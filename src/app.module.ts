import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'node:path';

import typeorm from '@config/database/typeorm';

import {
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from '@shared/filters';
import { JWTAuthGuard, RolesGuard } from '@shared/guards';

import { AuthModule } from '@modules/auth/auth.module';
import { CourseModule } from '@modules/course/course.module';
import { HealthModule } from '@modules/health/health.module';
import { SchoolMembersModule } from '@modules/schoolMembers/schoolMembers.module';
import { SchoolsModule } from '@modules/schools/schools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true, // load .env variables
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService) => configService.get('typeorm'),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/config/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    HealthModule,
    AuthModule,
    CourseModule,
    SchoolsModule,
    SchoolMembersModule,
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
        path: 'school-members',
        module: SchoolMembersModule,
      },
      {
        path: 'schools',
        module: SchoolsModule,
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
    {
      provide: 'APP_FILTER',
      useClass: ValidationExceptionFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
