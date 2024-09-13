import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Course } from '@shared/entities';
import { CourseRepository } from '@shared/repositories';

import { FindCourseByIdService } from '../findCourseById.service';

describe('FindCourseByIdService', () => {
  let findCourseByIdService: FindCourseByIdService;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    findCourseByIdService = module.get<FindCourseByIdService>(
      FindCourseByIdService,
    );
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(findCourseByIdService).toBeDefined();
    expect(courseRepository).toBeDefined();
  });

  describe('execute method', () => {
    it('should return the course when found', async () => {
      const courseId = 1;
      const courseData = {
        id: courseId,
        name: 'Course 1',
        description: 'Description 1',
        status: 'ACTIVE',
      } as Course;

      vi.spyOn(courseRepository, 'findById').mockResolvedValue(courseData);

      const result = await findCourseByIdService.execute(courseId);

      expect(courseRepository.findById).toHaveBeenCalledTimes(1);
      expect(courseRepository.findById).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(courseData);
    });

    it('should throw NotFoundException when course is not found', async () => {
      const courseId = 999;

      vi.spyOn(courseRepository, 'findById').mockResolvedValue(null);

      await expect(
        findCourseByIdService.execute(courseId),
      ).rejects.toThrowError(NotFoundException);
      expect(courseRepository.findById).toHaveBeenCalledTimes(1);
      expect(courseRepository.findById).toHaveBeenCalledWith(courseId);
    });
  });
});
