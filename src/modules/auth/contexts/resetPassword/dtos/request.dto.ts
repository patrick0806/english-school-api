import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'yezauohwpoaçaowdwaop.wudhaiuwdhuaw.awygdayugw' })
  resetToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'newPassword' })
  password: string;
}
