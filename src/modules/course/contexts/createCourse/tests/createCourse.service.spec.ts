import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CourseStatus } from '@shared/enums/course';
import { CourseRepository } from '@shared/repositories';

import { CreateCourseService } from '../createCourse.service';

describe('CreateCourseService', () => {
  let createCourseService: CreateCourseService;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCourseService,
        {
          provide: CourseRepository,
          useValue: {
            save: vi.fn(),
            findByName: vi.fn(),
          },
        },
      ],
    }).compile();

    createCourseService = module.get<CreateCourseService>(CreateCourseService);
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(createCourseService).toBeDefined();
    expect(courseRepository).toBeDefined();
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
    vi.spyOn(courseRepository, 'save').mockResolvedValue(savedCourse);
    const result = await createCourseService.execute(courseData);

    expect(courseRepository.save).toHaveBeenCalledTimes(1);
    expect(courseRepository.save).toHaveBeenCalledWith(courseData);
    expect(result).toEqual(savedCourse);
  });

  it('should throw an error if course already exists', async () => {
    vi.spyOn(courseRepository, 'save').mockRejectedValue(new Error());
    vi.spyOn(courseRepository, 'findByName').mockResolvedValue({
      id: 1,
      name: 'Course 1',
      description: 'Description 1',
      status: CourseStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const courseData = {
      name: 'Course 1',
      description: 'Description 1',
      status: CourseStatus.ACTIVE,
    };

    await expect(createCourseService.execute(courseData)).rejects.toThrow(
      'Course already exists',
    );
  });
});
