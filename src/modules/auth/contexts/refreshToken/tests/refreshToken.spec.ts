import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { schoolMemberMock } from '@shared/mocks/schoolMember.mock';
import { SchoolMemberRepository } from '@shared/repositories';

import { RefreshTokenController } from '../refreshToken.controller';
import { RefreshTokenService } from '../refreshToken.service';

vi.mock('nestjs-i18n', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    I18nService: { translate: vi.fn() },
    I18nContext: {
      current: vi.fn(() => ({
        lang: 'en',
      })),
    },
  };
});

describe('Create School Context', () => {
  let controller: RefreshTokenController;
  let service: RefreshTokenService;
  let repository: SchoolMemberRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [RefreshTokenController],
      providers: [
        RefreshTokenService,
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn().mockReturnValue('token'),
            verify: vi.fn().mockReturnValue({ sub: schoolMemberMock.id }),
          },
        },
        {
          provide: I18nService,
          useValue: {
            translate: vi.fn().mockReturnValue('Entity already exists'),
          },
        },
        {
          provide: SchoolMemberRepository,
          useValue: {
            findById: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RefreshTokenController>(RefreshTokenController);
    service = module.get<RefreshTokenService>(RefreshTokenService);
    repository = module.get<SchoolMemberRepository>(SchoolMemberRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should refresh user token with success', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(schoolMemberMock);
    const requestDTO = {
      refreshToken: 'token',
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toHaveBeenCalledWith(schoolMemberMock.id);
    expect(
      assert.deepStrictEqual(
        result,
        {
          accessToken: 'token',
          refreshToken: 'token',
          tokenType: 'Bearer',
        },
        'RefreshToken DTO result are not equals a spected mock result',
      ),
    ).toBeUndefined();
  });

  it('should block refresh if school are deactivated', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue({
      ...schoolMemberMock,
      school: { ...schoolMemberMock.school, isActive: false },
    });

    const requestDTO = {
      refreshToken: 'token',
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should block refresh if school member password dont match', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(schoolMemberMock);

    const requestDTO = {
      refreshToken: 'token',
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should block refresh if school member are deactivated', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue({
      ...schoolMemberMock,
      school: { ...schoolMemberMock.school, isActive: false },
    });

    const requestDTO = {
      refreshToken: 'token',
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
