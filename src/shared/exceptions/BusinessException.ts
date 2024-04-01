import { HttpException, HttpStatus } from '@nestjs/common';

export class BussinesException extends HttpException {
  constructor(message: string) {
    super(
      {
        title: 'Violation of business rules',
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
