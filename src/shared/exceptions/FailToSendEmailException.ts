import { HttpException, HttpStatus } from '@nestjs/common';

export class FailToSendEmailException extends HttpException {
  constructor({ message, errors }: Record<string, any>) {
    super(
      {
        title: 'Fail to send email',
        message: message || 'Fail to send email unknown error',
      },
      HttpStatus.BAD_REQUEST,
    );
    this.cause = errors;
  }
}
