import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolRequestDTO {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({ example: 'School name' })
  name: string;

  @IsBoolean({ message: 'validation.INVALID_BOOLEAN' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({ example: true })
  isActive: boolean;
}
