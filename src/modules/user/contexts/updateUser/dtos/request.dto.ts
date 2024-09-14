import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { DocumentType, UserRole, UserStatus } from '@shared/enums/user';

export class UpdateUserRequestDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Patrick da Silva Nicezi' })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'patrickk0806@gmail' })
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({ example: '5519993912304' })
  phoneNumber: string;

  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.TEACHER, enum: UserRole })
  role: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  isBrasilian: boolean;

  @IsOptional()
  @IsEnum(DocumentType)
  @ApiProperty({ example: DocumentType.CPF, enum: DocumentType })
  documentType: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '76376355030' })
  documentNumber: string;
}
