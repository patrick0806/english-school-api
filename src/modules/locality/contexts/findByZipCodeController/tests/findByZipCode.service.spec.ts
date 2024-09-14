import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { BrasilAPIConnector } from '@shared/connector';

import { FindByZipCodeService } from '../findByZipCode.service';

describe('FindByZipCodeService', () => {
  let service: FindByZipCodeService;
  let brasilAPIConnectorMock: Partial<BrasilAPIConnector>;
  let findAddressByZipCodeMock: any;

  beforeEach(async () => {
    findAddressByZipCodeMock = vi.fn().mockResolvedValue({
      cep: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua Principal',
    });

    brasilAPIConnectorMock = {
      findAddressByZipCode: findAddressByZipCodeMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByZipCodeService,
        {
          provide: BrasilAPIConnector,
          useValue: brasilAPIConnectorMock,
        },
      ],
    }).compile();

    service = module.get<FindByZipCodeService>(FindByZipCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute method', () => {
    it('should return address details for given zip code', async () => {
      const zipCode = '12345678';
      const result = await service.execute(zipCode);

      expect(findAddressByZipCodeMock).toHaveBeenCalledWith({ zipCode });
      expect(result).toEqual({
        zipCode: '12345-678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        street: 'Rua Principal',
      });
    });

    it('should handle error when BrasilAPIConnector throws', async () => {
      const zipCode = 'invalid_zip_code';
      findAddressByZipCodeMock.mockRejectedValue(new Error('Invalid zip code'));

      await expect(service.execute(zipCode)).rejects.toThrowError(
        'Invalid zip code',
      );
    });
  });
});
