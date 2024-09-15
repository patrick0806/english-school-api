import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'jhondoe@email.com' })
  email: string;
}
