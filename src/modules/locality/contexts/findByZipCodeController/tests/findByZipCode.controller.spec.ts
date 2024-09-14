import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { FindByZipCodeController } from '../findByZipCode.controller';
import { FindByZipCodeService } from '../findByZipCode.service';

describe('FindByZipCodeController', () => {
  let controller: FindByZipCodeController;
  let serviceMock: Partial<FindByZipCodeService>;
  let serviceExecuteMock: any;

  beforeEach(async () => {
    serviceExecuteMock = vi.fn().mockResolvedValue({
      zipCode: '12345-678',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua Principal',
    });

    serviceMock = {
      execute: serviceExecuteMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByZipCodeController],
      providers: [
        {
          provide: FindByZipCodeService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<FindByZipCodeController>(FindByZipCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handler method', () => {
    it('should return address details for given zip code', async () => {
      const zipCode = '12345678';
      const result = await controller.handler(zipCode);

      expect(serviceExecuteMock).toHaveBeenCalledWith(zipCode);
      expect(result).toEqual({
        zipCode: '12345-678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        street: 'Rua Principal',
      });
    });

    it('should handle error when service throws', async () => {
      const zipCode = 'invalid_zip_code';
      serviceExecuteMock.mockRejectedValue(new Error('Invalid zip code'));

      await expect(controller.handler(zipCode)).rejects.toThrowError(
        'Invalid zip code',
      );
    });
  });
});
