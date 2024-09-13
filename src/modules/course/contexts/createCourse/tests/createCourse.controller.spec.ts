import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CourseStatus } from '@shared/enums/course';

import { CreateCourseController } from '../createCourse.controller';
import { CreateCourseService } from '../createCourse.service';

describe('CreateCourseController', () => {
  let createCourseControler: CreateCourseController;
  let createCourseService: CreateCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCourseController],
      providers: [
        {
          provide: CreateCourseService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    createCourseService = module.get<CreateCourseService>(CreateCourseService);
    createCourseControler = module.get<CreateCourseController>(
      CreateCourseController,
    );
  });

  it('should be defined', () => {
    expect(createCourseControler).toBeDefined();
    expect(createCourseService).toBeDefined();
  });

  it('should create a new course', async () => {
    const courseData = {
      name: 'Course 1',
      description: 'Description 1',
      status: CourseStatus.ACTIVE,
    };
    const savedCourse = {
      id: 1,
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.spyOn(createCourseService, 'execute').mockResolvedValue(savedCourse);
    const result = await createCourseService.execute(courseData);

    expect(createCourseService.execute).toHaveBeenCalledTimes(1);
    expect(createCourseService.execute).toHaveBeenCalledWith(courseData);
    expect(result).toEqual(savedCourse);
  });
});
