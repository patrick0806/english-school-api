import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { DocumentType, UserRole, UserStatus } from '@shared/enums/user';

export class CreateUserRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Patrick da Silva Nicezi' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'patrickk0806@gmail' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({ example: '5519993912304' })
  phoneNumber: string;

  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.TEACHER, enum: UserRole })
  role: UserRole;

  @IsEnum(UserStatus)
  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @IsBoolean()
  @ApiProperty({ example: true })
  isBrasilian: boolean;

  @IsEnum(DocumentType)
  @ApiProperty({ example: DocumentType.CPF, enum: DocumentType })
  documentType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '76376355030' })
  documentNumber: string;
}
