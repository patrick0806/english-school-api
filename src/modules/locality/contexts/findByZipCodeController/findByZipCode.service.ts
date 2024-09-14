import { Injectable } from '@nestjs/common';

import { BrasilAPIConnector } from '@shared/connector';

import { FindByZipCodeResponseDTO } from './dtos/response.dto';

@Injectable()
export class FindByZipCodeService {
  constructor(private brasilAPIConnector: BrasilAPIConnector) {}

  async execute(zipCode: string): Promise<FindByZipCodeResponseDTO> {
    const data = await this.brasilAPIConnector.findAddressByZipCode({
      zipCode,
    });
    return {
      zipCode: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
    };
  }
}
