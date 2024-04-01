import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(validationErrors: ValidationError[]) {
    const fieldsErrors = validationErrors.flatMap((error) => {
      const notFollowedRules = Object.keys(error.constraints);
      return notFollowedRules.map((rule) => {
        return {
          name: error.property,
          userMessage: error.constraints[rule],
        };
      });
    });

    super(
      {
        title: 'Invalid params',
        message: 'Invalid params send in request',
        fields: fieldsErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'ValidationException';
  }
}
