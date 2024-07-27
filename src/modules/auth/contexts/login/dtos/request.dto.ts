import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @ApiProperty({ example: 'jhondoe@gmail.com' })
  email: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({ example: 'somepass' })
  password: string;
}
