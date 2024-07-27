import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @ApiProperty({ example: 'jhondoe@gmail.com' })
  email: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({ example: 'somepass' })
  password: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: '1' })
  schoolId: number;
}
