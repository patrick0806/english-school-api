import 'dotenv/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerConfig } from '@config/swagger';

import { API_BASE_PATH } from '@shared/constants/apiBasePath';
import { ValidationException } from '@shared/exceptions/validationException';
import { ExceptionsFilter } from '@shared/filters/ExceptionFilter';
import { UnexpectedExceptionFilter } from '@shared/filters/UnexpectedExceptionFilter';
import {
  BuildResponseInterceptor,
  DurationRequestInterceptor,
} from '@shared/interceptors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.setupSwagger(`${API_BASE_PATH}/docs`, app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErros) => {
        throw new ValidationException(validationErros);
      },
    }),
  );

  app.useGlobalFilters(new UnexpectedExceptionFilter(), new ExceptionsFilter());
  app.useGlobalInterceptors(
    new DurationRequestInterceptor(),
    new BuildResponseInterceptor(),
  );
  app.setGlobalPrefix(API_BASE_PATH);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
