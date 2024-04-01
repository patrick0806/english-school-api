import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { LOG_LEVEL_NAMES, LOG_LEVEL_VALUES } from '@shared/enums';
import { IRequest } from '@shared/interfaces';
import { LogBuilderService } from '@shared/providers';

@Catch()
export class UnexpectedExceptionFilter implements ExceptionFilter {
  private logBuilder = LogBuilderService.getInstance();

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<IRequest>();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logBuilder.build(
      {
        operation: request.operation,
        level: LOG_LEVEL_VALUES.ERROR,
        levelName: LOG_LEVEL_NAMES.ERROR,
        message: exception.message,
        error: exception.stack.toString(),
      },
      request,
    );

    response.status(statusCode).json({
      status: statusCode,
      title: 'Internal server error',
      detail: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
