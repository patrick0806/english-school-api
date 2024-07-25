import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { I18nModule, I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { join } from 'path';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { SchoolDTO } from '@shared/dtos';
import { schoolMock } from '@shared/mocks/school.mock';
import { SchoolRepository } from '@shared/repositories';

import { CreateSchoolController } from '../createSchool.controller';
import { CreateSchoolService } from '../createSchool.service';

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
  let controller: CreateSchoolController;
  let service: CreateSchoolService;
  let repository: SchoolRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: join(__dirname, '../../../', '/config/i18n/'),
            watch: true,
          },
        }),
      ],
      controllers: [CreateSchoolController],
      providers: [
        CreateSchoolService,
        {
          provide: I18nService,
          useValue: {
            translate: vi.fn().mockReturnValue('Entity already exists'),
          },
        },
        {
          provide: SchoolRepository,
          useValue: {
            findByName: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateSchoolController>(CreateSchoolController);
    service = module.get<CreateSchoolService>(CreateSchoolService);
    repository = module.get<SchoolRepository>(SchoolRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a school with success', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(null);
    vi.spyOn(repository, 'save').mockResolvedValue(schoolMock);

    const requestDTO = {
      name: schoolMock.name,
      isActive: schoolMock.isActive,
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findByName).toBeCalledTimes(1);
    expect(repository.findByName).toHaveBeenCalledWith(schoolMock.name);
    expect(repository.save).toBeCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(requestDTO);
    expect(
      assert.deepStrictEqual(
        result,
        plainToClass(SchoolDTO, schoolMock),
        'SchoolsDTO are not equal',
      ),
    ).toBeUndefined();
  });

  it('should not create a school with an existing name', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(schoolMock);

    const requestDTO = {
      name: schoolMock.name,
      isActive: schoolMock.isActive,
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Entity already exists');
    }
  });
});
