import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenRequestDTO {
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;
}
