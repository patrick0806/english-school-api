import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { schoolMemberMock } from '@shared/mocks/schoolMember.mock';
import { SchoolMemberRepository } from '@shared/repositories';

import { LocalStrategy } from '@modules/auth/strategies/local.strategy';

import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';

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

describe('Login Context', () => {
  let controller: LoginController;
  let service: LoginService;
  let repository: SchoolMemberRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [LoginController],
      providers: [
        LoginService,
        LocalStrategy,
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn().mockReturnValue('token'),
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
            findByEmail: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
    repository = module.get<SchoolMemberRepository>(SchoolMemberRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should login with success', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(schoolMemberMock);
    const requestDTO = {
      email: schoolMemberMock.email,
      password: '123456',
      schoolId: schoolMemberMock.school.id,
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findByEmail).toBeCalledTimes(1);
    expect(repository.findByEmail).toHaveBeenCalledWith(
      schoolMemberMock.email,
      schoolMemberMock.school.id,
    );
    expect(
      assert.deepStrictEqual(
        result,
        {
          accessToken: 'token',
          refreshToken: 'token',
          tokenType: 'Bearer',
        },
        'LoginResponse DTO result are not equals a spected mock result',
      ),
    ).toBeUndefined();
  });

  it('should block login if school are deactivated', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue({
      ...schoolMemberMock,
      school: { ...schoolMemberMock.school, isActive: false },
    });

    const requestDTO = {
      email: schoolMemberMock.email,
      password: '123456',
      schoolId: schoolMemberMock.school.id,
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should block login if school member password dont match', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(schoolMemberMock);

    const requestDTO = {
      email: schoolMemberMock.email,
      password: '1256',
      schoolId: schoolMemberMock.school.id,
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should block login if school member are deactivated', async () => {
    vi.spyOn(repository, 'findByEmail').mockResolvedValue({
      ...schoolMemberMock,
      school: { ...schoolMemberMock.school, isActive: false },
    });

    const requestDTO = {
      email: schoolMemberMock.email,
      password: '123456',
      schoolId: schoolMemberMock.school.id,
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
