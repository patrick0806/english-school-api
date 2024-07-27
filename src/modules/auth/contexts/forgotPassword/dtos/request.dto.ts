import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ForgotPasswordRequestDTO {
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @ApiProperty({ example: 'jhodoe@me.com', type: String })
  email: string;

  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({ example: '1', type: Number })
  schoolId: number;
}
