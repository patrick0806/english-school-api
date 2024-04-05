import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

import { UserStatus, UserType } from '@shared/enums';

export class CreateUserRequestDTO {
  @IsString()
  @ApiProperty({ example: 'Jhon Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'jhondoe@me.com' })
  email: string;

  @IsPhoneNumber('BR')
  @ApiProperty({ example: '19993910000' })
  phoneNumber: string;

  @IsString()
  @ApiProperty({ example: UserType.ADMIN, enum: UserType })
  type: UserType;

  @IsString()
  @ApiProperty({ example: 'English' })
  course: string;

  @IsString()
  @ApiProperty({ example: 'English School' })
  school: string;

  @IsString()
  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;
}
