import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { LoginRequestDTO } from '../dtos/request.dto';
import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  describe('handle', () => {
    const mockRequestDTO: LoginRequestDTO = {
      email: 'user@example.com',
      password: 'password',
    };

    beforeEach(() => {
      vi.mocked(service.execute).mockResolvedValue({
        accessToken: 'token',
        refreshToken: 'refresh-token',
      });
    });

    it('should call LoginService execute method', async () => {
      await controller.handle(mockRequestDTO);

      expect(service.execute).toHaveBeenCalledTimes(1);
      expect(service.execute).toHaveBeenCalledWith(mockRequestDTO);
    });

    it('should return result from LoginService', async () => {
      const result = await controller.handle(mockRequestDTO);

      expect(result).toEqual({
        accessToken: 'token',
        refreshToken: 'refresh-token',
      });
    });
  });
});
