import { ApiProperty } from '@nestjs/swagger';

export class FindByZipCodeResponseDTO {
  @ApiProperty({ example: '00000000' })
  zipCode: string;

  @ApiProperty({ example: 'SP' })
  state: string;

  @ApiProperty({ example: 'Sao João da Boa Vista' })
  city: string;

  @ApiProperty({ example: 'Jardmin Crepusculo' })
  neighborhood: string;

  @ApiProperty({ example: 'Rua Sebastião Camargo' })
  street: string;
}
