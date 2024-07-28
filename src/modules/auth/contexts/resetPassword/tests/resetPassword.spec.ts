import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { schoolMemberMock } from '@shared/mocks/schoolMember.mock';
import { SchoolMemberRepository } from '@shared/repositories';

import { ResetPasswordController } from '../resetPassword.controller';
import { ResetPasswordService } from '../resetPassword.service';

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

describe('Reset Password Context', () => {
  let controller: ResetPasswordController;
  let service: ResetPasswordService;
  let jwtService: JwtService;
  let repository: SchoolMemberRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [ResetPasswordController],
      providers: [
        ResetPasswordService,
        {
          provide: JwtService,
          useValue: {
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
            save: vi.fn().mockResolvedValue(schoolMemberMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
    service = module.get<ResetPasswordService>(ResetPasswordService);
    repository = module.get<SchoolMemberRepository>(SchoolMemberRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should reset user password with success', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(schoolMemberMock);
    const requestDTO = {
      resetToken: 'token',
      password: 'newPassword',
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toHaveBeenCalledWith(schoolMemberMock.id);
    expect(result).toBeUndefined();
  });

  it('should throw an error when user is not found', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(null);
    const requestDTO = {
      resetToken: 'token',
      password: 'newPassword',
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when reset token is invalid', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(schoolMemberMock);
    vi.spyOn(jwtService, 'verify').mockRejectedValue(
      new BadRequestException('Invalid token'),
    );

    const requestDTO = {
      resetToken: 'token',
      password: 'newPassword',
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
