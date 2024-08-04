import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { courseMock } from '@shared/mocks';
import { CourseRepository } from '@shared/repositories';

import { FindCourseByIdResponseDTO } from '../dtos/response.dto';
import { FindCourseByIdController } from '../findCourseById.controller';
import { FindCourseByIdService } from '../findCourseById.service';

describe('Find course by Idcontext', () => {
  let controller: FindCourseByIdController;
  let service: FindCourseByIdService;
  let repository: CourseRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [FindCourseByIdController],
      providers: [
        FindCourseByIdService,
        {
          provide: CourseRepository,
          useValue: {
            findById: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FindCourseByIdController>(FindCourseByIdController);
    service = module.get<FindCourseByIdService>(FindCourseByIdService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('Should be define a module with success', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be find a course with success', async () => {
    const courseId = 1;

    vi.spyOn(repository, 'findById').mockResolvedValue(courseMock);

    const result = await controller.handle(courseId);
    expect(repository.findById).toBeCalledWith(courseId);
    expect(repository.findById).toBeCalledTimes(1);
    expect(result).toEqual(plainToClass(FindCourseByIdResponseDTO, courseMock));
  });

  it('Should be return an error when course not found', async () => {
    const courseId = 1;

    vi.spyOn(repository, 'findById').mockResolvedValue(null);

    try {
      await controller.handle(courseId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });
});
