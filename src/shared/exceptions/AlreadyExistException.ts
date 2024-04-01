import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadExistsException extends HttpException {
  constructor(message: string) {
    super(
      {
        title: 'Conflict',
        message,
      },
      HttpStatus.CONFLICT,
    );
  }
}
