import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { FindAddressByZipCodeDTOs } from './dtos';

@Injectable()
export class BrasilAPIConnector {
  constructor(private readonly httpService: HttpService) {}

  async findAddressByZipCode({
    zipCode,
  }: FindAddressByZipCodeDTOs.RequestDTO): Promise<FindAddressByZipCodeDTOs.ResponseDTO> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<FindAddressByZipCodeDTOs.ResponseDTO>(
          `https://brasilapi.com.br/api/cep/v2/${zipCode}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );

    return data;
  }
}
