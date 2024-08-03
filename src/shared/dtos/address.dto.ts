import { ApiProperty } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Rua das flores' })
  street: string;

  @ApiProperty({ example: '68A' })
  number: string;

  @ApiProperty({ example: 'Jardim Crepusculo' })
  neighborhood: string;

  @ApiProperty({ example: 'São João da Boa Vista' })
  city: string;

  @ApiProperty({ example: 'SP' })
  state: string;

  @ApiProperty({ example: 'Brasil' })
  country: string;

  @ApiProperty({ example: '123456' })
  zipCode: string;
}
