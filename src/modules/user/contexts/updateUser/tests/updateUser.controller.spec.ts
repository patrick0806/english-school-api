import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { UpdateUserRequestDTO } from '../dtos/request.dto';
import { UpdateUserResponseDTO } from '../dtos/response.dto';
import { UpdateUserController } from '../updateUser.controller';
import { UpdateUserService } from '../updateUser.service';

describe('UpdateUserController', () => {
  let updateUserController: UpdateUserController;
  let updateUserService: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UpdateUserService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    updateUserController =
      module.get<UpdateUserController>(UpdateUserController);
    updateUserService = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(updateUserController).toBeDefined();
    expect(updateUserService).toBeDefined();
  });

  describe('handler method', () => {
    it('should call the service with the correct data', async () => {
      const userId = 1;
      const userData = {
        name: 'Updated Name',
        email: 'updated@email.com',
      } as UpdateUserRequestDTO;
      const mockResult = {
        id: userId,
        name: userData.name,
        email: userData.email,
      } as UpdateUserResponseDTO;

      vi.spyOn(updateUserService, 'execute').mockResolvedValue(
        mockResult as UpdateUserResponseDTO,
      );

      const result = await updateUserController.handler(userId, userData);

      expect(updateUserService.execute).toHaveBeenCalledTimes(1);
      expect(updateUserService.execute).toHaveBeenCalledWith(userId, userData);
      expect(result).toEqual(mockResult);
    });

    it('should throw NotFoundException when service fails', async () => {
      const userId = 999;
      const userData = {
        name: 'Non-existent User',
        email: 'nonexistent@email.com',
      } as UpdateUserRequestDTO;

      vi.spyOn(updateUserService, 'execute').mockRejectedValue(
        new NotFoundException({
          error: 'Not found',
          message: 'User not found',
        }),
      );

      await expect(
        updateUserController.handler(userId, userData),
      ).rejects.toThrowError(NotFoundException);
      expect(updateUserService.execute).toHaveBeenCalledTimes(1);
      expect(updateUserService.execute).toHaveBeenCalledWith(userId, userData);
    });
  });
});
