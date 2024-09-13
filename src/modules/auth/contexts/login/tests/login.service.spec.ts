import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { User } from '@shared/entities';
import { UserRole } from '@shared/enums/user';

import { LocalStrategy } from '@modules/auth/strategies/local.strategy';

import { LoginRequestDTO } from '../dtos/request.dto';
import { LoginResponseDTO } from '../dtos/response.dto';
import { LoginService } from '../login.service';

describe('LoginService', () => {
  let service: LoginService;
  let localStrategy: LocalStrategy;
  let jwtService: JwtService;

  // Mock do LocalStrategy e JwtService
  const mockLocalStrategy = {
    validate: vi.fn(),
  };

  const mockJwtService = {
    sign: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: LocalStrategy,
          useValue: mockLocalStrategy,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('execute', () => {
    const mockTokenPayload = {
      id: 1,
      name: 'user',
      email: 'user@example.com',
      role: UserRole.ADMIN,
    } as User;
    const mockRequestDTO: LoginRequestDTO = {
      email: 'user@example.com',
      password: 'password',
    };

    beforeEach(() => {
      vi.mocked(localStrategy.validate).mockResolvedValue(mockTokenPayload);
      vi.mocked(jwtService.sign).mockImplementation((payload) =>
        JSON.stringify(payload),
      );
    });

    it('should call LocalStrategy validate method', async () => {
      await service.execute(mockRequestDTO);

      expect(localStrategy.validate).toHaveBeenCalledWith(
        mockRequestDTO.email,
        mockRequestDTO.password,
      );
      expect(localStrategy.validate).toHaveBeenCalledTimes(1);
    });

    it('should generate access token', async () => {
      await service.execute(mockRequestDTO);

      expect(jwtService.sign).toHaveBeenCalledWith(
        mockTokenPayload,
        expect.objectContaining({ expiresIn: expect.any(String) }),
      );
    });

    it('should generate refresh token', async () => {
      await service.execute(mockRequestDTO);

      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: mockTokenPayload.id },
        expect.objectContaining({ expiresIn: expect.any(String) }),
      );
    });

    it('should return LoginResponseDTO', async () => {
      const result: LoginResponseDTO = await service.execute(mockRequestDTO);

      expect(result).toEqual({
        accessToken: JSON.stringify(mockTokenPayload),
        refreshToken: JSON.stringify({
          id: mockTokenPayload.id,
        }),
      });
    });
  });
});
