import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { courseMock } from '@shared/mocks';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseController } from '../createCourse.controller';
import { CreateCourseService } from '../createCourse.service';
import { CreateCourseResponseDTO } from '../dtos/response.dto';

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

describe('Create course Context', () => {
  let controller: CreateCourseController;
  let service: CreateCourseService;
  let repository: CourseRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [CreateCourseController],
      providers: [
        CreateCourseService,
        {
          provide: I18nService,
          useValue: {
            translate: vi.fn().mockReturnValue('Entity already exists'),
          },
        },
        {
          provide: CourseRepository,
          useValue: {
            findByName: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateCourseController>(CreateCourseController);
    service = module.get<CreateCourseService>(CreateCourseService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a curse with success', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(null);
    vi.spyOn(repository, 'save').mockResolvedValue(courseMock);

    const requestDTO = {
      name: courseMock.name,
      description: courseMock.description,
      isActive: courseMock.isActive,
      school: {
        id: courseMock.school.id,
      },
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findByName).toBeCalledTimes(1);
    expect(repository.findByName).toHaveBeenCalledWith(
      courseMock.name,
      courseMock.school.id,
    );
    expect(repository.save).toBeCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(requestDTO);
    expect(
      assert.deepStrictEqual(
        result,
        plainToClass(CreateCourseResponseDTO, courseMock),
        'SchoCourseDTO are not equal',
      ),
    ).toBeUndefined();
  });

  it('should not create a curse with an existing name', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(courseMock);

    const requestDTO = {
      name: courseMock.name,
      description: courseMock.description,
      isActive: courseMock.isActive,
      school: {
        id: courseMock.school.id,
      },
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });
});
