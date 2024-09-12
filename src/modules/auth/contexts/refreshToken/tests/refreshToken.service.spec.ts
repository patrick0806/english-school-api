import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import env from '@config/env';

import { User } from '@shared/entities';
import { UserRepository } from '@shared/repositories';

import { RefreshTokenService } from '../refreshToken.service';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        {
          provide: JwtService,
          useValue: {
            verify: vi.fn(),
            sign: vi.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findByEmail: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const refreshToken = 'refresh-token';
    const decodedToken = { id: 'user-id', role: 'ADMIN' };
    const user = { id: 1, name: 'Admin User', email: 'admin@example.com' };

    beforeEach(() => {
      vi.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(user as User);
    });

    it('should refresh token for admin', async () => {
      const result = await service.execute(refreshToken);

      expect(jwtService.verify).toHaveBeenCalledWith(refreshToken, {
        secret: env().application.jwt.refreshSecret,
      });
      expect(userRepository.findByEmail).toHaveBeenCalledWith('user-id');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw an error for invalid token', async () => {
      vi.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.execute(refreshToken)).rejects.toThrow(Error);
    });
  });
});
