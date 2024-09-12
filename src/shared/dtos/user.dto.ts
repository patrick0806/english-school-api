import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { DocumentType, UserRole, UserStatus } from '@shared/enums/user';

export class UserDTO {
  @ApiProperty({ example: 1, nullable: true })
  id: number;

  @ApiProperty({ example: 'Patrick da Silva Nicezi' })
  name: string;

  @ApiProperty({ example: 'patrickk0806@gmail' })
  email: string;

  @ApiProperty({ example: '123456' })
  @Exclude()
  password: string;

  @ApiProperty({ example: '5519993912304' })
  phoneNumber: string;

  @ApiProperty({ example: UserRole.TEACHER, enum: UserRole })
  role: string;

  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ example: true })
  isBrasilian: boolean;

  @ApiProperty({ example: DocumentType.CPF, enum: DocumentType })
  documentType: string;

  @ApiProperty({ example: '76376355030' })
  documentNumber: string;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
