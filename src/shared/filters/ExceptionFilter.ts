import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionDTO } from './exception.dto';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(
    exception: HttpException & Omit<ExceptionDTO, 'status'>,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);

    const statusCode =
      Number(exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception?.getResponse() as Record<string, any>;

    response.status(statusCode).json({
      status: statusCode,
      title: exceptionResponse?.title || exception.message,
      detail: exceptionResponse?.message,
      timestamp: new Date().toISOString(),
      fields: exceptionResponse?.fields,
    });
  }
}
