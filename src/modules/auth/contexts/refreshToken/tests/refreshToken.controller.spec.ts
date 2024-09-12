import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { RefreshTokenRequestDTO } from '../dtos/request.dto';
import { RefreshTokenResponseDTO } from '../dtos/response.dto';
import { RefreshTokenController } from '../refreshToken.controller';
import { RefreshTokenService } from '../refreshToken.service';

describe('RefreshTokenController', () => {
  let controller: RefreshTokenController;
  let refreshTokenService: RefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshTokenController],
      providers: [
        {
          provide: RefreshTokenService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RefreshTokenController>(RefreshTokenController);
    refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handle', () => {
    const refreshToken = 'refresh-token';
    const requestDto: RefreshTokenRequestDTO = { refreshToken };
    const responseDto: RefreshTokenResponseDTO = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    };

    beforeEach(() => {
      vi.spyOn(refreshTokenService, 'execute').mockResolvedValue(responseDto);
    });

    it('should call refreshTokenService.execute with correct parameters', async () => {
      await controller.handle(requestDto);

      expect(refreshTokenService.execute).toHaveBeenCalledWith(refreshToken);
    });

    it('should return the result from refreshTokenService.execute', async () => {
      const result = await controller.handle(requestDto);

      expect(result).toEqual(responseDto);
    });

    it('should throw an error if refreshTokenService.execute fails', async () => {
      vi.spyOn(refreshTokenService, 'execute').mockRejectedValue(
        new Error('Test error'),
      );

      await expect(controller.handle(requestDto)).rejects.toThrowError(
        'Test error',
      );
    });
  });
});
