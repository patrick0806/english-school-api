import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { LOG_LEVEL_NAMES, LOG_LEVEL_VALUES } from '@shared/enums';
import { IRequest } from '@shared/interfaces';
import { LogBuilderService } from '@shared/providers';

import { ExceptionDTO } from './exception.dto';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private logBuilder = LogBuilderService.getInstance();

  catch(
    exception: HttpException & Omit<ExceptionDTO, 'status'>,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<IRequest>();
    const response = ctx.getResponse<Response>();

    const statusCode =
      Number(exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception?.getResponse() as Record<string, any>;
    console.log(exception);
    this.logBuilder.build(
      {
        operation: request.operation,
        level:
          statusCode < 500 ? LOG_LEVEL_VALUES.WARN : LOG_LEVEL_VALUES.ERROR,
        levelName:
          statusCode < 500 ? LOG_LEVEL_NAMES.WARN : LOG_LEVEL_NAMES.ERROR,
        message: exception.message,
        error: exception.stack.toString(),
      },
      request,
    );

    response.status(statusCode).json({
      status: statusCode,
      title: exceptionResponse?.title || exception.message,
      detail: exceptionResponse?.message,
      timestamp: new Date().toISOString(),
      fields: exceptionResponse?.fields,
    });
  }
}
