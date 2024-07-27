import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { SchoolDTO } from '@shared/dtos';
import { schoolMock } from '@shared/mocks/school.mock';
import { SchoolRepository } from '@shared/repositories';

import { DisableSchoolController } from '../disableSchool.controller';
import { DisableSchoolService } from '../disableSchool.service';

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
  let controller: DisableSchoolController;
  let service: DisableSchoolService;
  let repository: SchoolRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [DisableSchoolController],
      providers: [
        DisableSchoolService,
        {
          provide: I18nService,
          useValue: {
            translate: vi.fn().mockReturnValue('Entity already exists'),
          },
        },
        {
          provide: SchoolRepository,
          useValue: {
            findById: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DisableSchoolController>(DisableSchoolController);
    service = module.get<DisableSchoolService>(DisableSchoolService);
    repository = module.get<SchoolRepository>(SchoolRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should disable a school with success', async () => {
    const disabledSchoolMock = {
      ...schoolMock,
      isActive: false,
    };
    vi.spyOn(repository, 'findById').mockResolvedValue(schoolMock);
    vi.spyOn(repository, 'save').mockResolvedValue(disabledSchoolMock);

    const schoolId = 1;

    const result = await controller.handle(schoolId);

    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toHaveBeenCalledWith(schoolMock.id);
    expect(repository.save).toBeCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(disabledSchoolMock);
    expect(
      assert.deepStrictEqual(
        result,
        plainToClass(SchoolDTO, disabledSchoolMock),
        'SchoolsDTO are not equal',
      ),
    ).toBeUndefined();
  });

  it('should fail on update a not found school', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(null);

    const schoolId = 1;

    try {
      await controller.handle(schoolId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
