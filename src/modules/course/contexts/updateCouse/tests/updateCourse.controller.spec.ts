import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, vi, it, beforeEach } from 'vitest';

import { CourseStatus } from '@shared/enums/course';

import { UpdateCourseController } from '../updateCourse.controller';
import { UpdateCourseService } from '../updateCourse.service';

describe('UpdateCourseController', () => {
  let updateCourseController: UpdateCourseController;
  let updateCourseService: UpdateCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCourseController],
      providers: [
        {
          provide: UpdateCourseService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    updateCourseService = module.get<UpdateCourseService>(UpdateCourseService);
    updateCourseController = module.get<UpdateCourseController>(
      UpdateCourseController,
    );
  });

  it('should be defined', () => {
    expect(updateCourseController).toBeDefined();
    expect(updateCourseService).toBeDefined();
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
    vi.spyOn(updateCourseService, 'execute').mockResolvedValue(savedCourse);
    const result = await updateCourseController.handler(
      courseData.id,
      newCourseData,
    );

    expect(updateCourseService.execute).toHaveBeenCalledTimes(1);
    expect(updateCourseService.execute).toHaveBeenCalledWith(
      courseData.id,
      newCourseData,
    );
    expect(result).toEqual(savedCourse);
  });
});
