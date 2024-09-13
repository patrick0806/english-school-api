import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { FindCourseByIdResponseDTO } from '../dtos/response.dto';
import { FindCourseByIdController } from '../findCourseById.controller';
import { FindCourseByIdService } from '../findCourseById.service';

describe('FindCourseByIdController', () => {
  let findCourseByIdController: FindCourseByIdController;
  let findCourseByIdService: FindCourseByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindCourseByIdController],
      providers: [
        {
          provide: FindCourseByIdService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    findCourseByIdController = module.get<FindCourseByIdController>(
      FindCourseByIdController,
    );
    findCourseByIdService = module.get<FindCourseByIdService>(
      FindCourseByIdService,
    );
  });

  it('should be defined', () => {
    expect(findCourseByIdController).toBeDefined();
    expect(findCourseByIdService).toBeDefined();
  });

  describe('handler method', () => {
    it('should call the service with the correct ID', async () => {
      const courseId = 1;
      const mockResult = {
        id: courseId,
        name: 'Test Course',
        description: 'Test Description',
        status: 'ACTIVE',
      } as FindCourseByIdResponseDTO;

      vi.spyOn(findCourseByIdService, 'execute').mockResolvedValue(mockResult);

      const result = await findCourseByIdController.handler(courseId);

      expect(findCourseByIdService.execute).toHaveBeenCalledTimes(1);
      expect(findCourseByIdService.execute).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(mockResult);
    });

    it('should throw NotFoundException when service fails', async () => {
      const courseId = 999;

      vi.spyOn(findCourseByIdService, 'execute').mockRejectedValue(
        new NotFoundException('Not Found'),
      );

      await expect(
        findCourseByIdController.handler(courseId),
      ).rejects.toThrowError(NotFoundException);
      expect(findCourseByIdService.execute).toHaveBeenCalledTimes(1);
      expect(findCourseByIdService.execute).toHaveBeenCalledWith(courseId);
    });
  });
});
