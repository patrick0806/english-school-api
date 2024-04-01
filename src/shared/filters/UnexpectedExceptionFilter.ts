import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UnexpectedExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      status: statusCode,
      title: 'Internal server error',
      detail: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
