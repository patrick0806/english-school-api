import { HttpException, HttpStatus } from '@nestjs/common';

export class FirebaseAuthException extends HttpException {
  constructor(status: HttpStatus, message: string) {
    super(
      {
        title: 'Fail to create or validate user',
        message: message,
      },
      status,
    );
  }
}
