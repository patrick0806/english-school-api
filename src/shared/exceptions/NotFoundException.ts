import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        title: 'Resource not found',
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
