import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordRequestDTO {
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'resetToken' })
  resetToken: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'password' })
  password: string;
}
