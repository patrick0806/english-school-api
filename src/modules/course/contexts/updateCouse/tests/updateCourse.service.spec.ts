import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, vi, it, beforeEach } from 'vitest';

import { CourseStatus } from '@shared/enums/course';
import { CourseRepository } from '@shared/repositories';

import { UpdateCourseService } from '../updateCourse.service';

describe('UpdateCourseService', () => {
  let updateCourseService: UpdateCourseService;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCourseService,
        {
          provide: CourseRepository,
          useValue: {
            save: vi.fn(),
            findById: vi.fn(),
          },
        },
      ],
    }).compile();

    updateCourseService = module.get<UpdateCourseService>(UpdateCourseService);
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(updateCourseService).toBeDefined();
    expect(courseRepository).toBeDefined();
  });

  it('should update a course', async () => {
    const courseData = {
      id: 1,
      name: 'Old Name',
      description: 'Old Description',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newCourseData = {
      name: 'Course 1',
      description: 'Description 1',
      status: CourseStatus.INACTIVE,
    };
    const savedCourse = {
      id: 1,
      ...newCourseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.spyOn(courseRepository, 'findById').mockResolvedValue(courseData);
    vi.spyOn(courseRepository, 'save').mockResolvedValue(savedCourse);
    const result = await updateCourseService.execute(1, newCourseData);

    expect(courseRepository.findById).toHaveBeenCalledTimes(1);
    expect(courseRepository.findById).toHaveBeenCalledWith(1);
    expect(courseRepository.save).toHaveBeenCalledTimes(1);
    expect(courseRepository.save).toHaveBeenCalledWith(savedCourse);
    expect(result).toEqual(savedCourse);
  });

  it('should throw an error if course not found', async () => {
    const newCourseData = {
      name: 'Course 1',
      description: 'Description 1',
      status: CourseStatus.INACTIVE,
    };
    vi.spyOn(courseRepository, 'findById').mockResolvedValue(null);
    await expect(updateCourseService.execute(1, newCourseData)).rejects.toThrow(
      'Not found course with id: 1',
    );
  });
});
