import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { User } from '@shared/entities';
import { UserRepository } from '@shared/repositories';

import { UpdateUserRequestDTO } from '../dtos/request.dto';
import { UpdateUserService } from '../updateUser.service';

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UserRepository,
          useValue: {
            findById: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    updateUserService = module.get<UpdateUserService>(UpdateUserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(updateUserService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute method', () => {
    it('should update an existing user successfully', async () => {
      const userId = 1;
      const userData = {
        name: 'Updated Name',
        email: 'updated@email.com',
      } as UpdateUserRequestDTO;
      const existingUser = {
        id: userId,
        name: 'Old Name',
        email: 'old@email.com',
      } as User;
      const updatedUser = { ...existingUser, ...userData } as User;

      vi.spyOn(userRepository, 'findById').mockResolvedValue(existingUser);
      vi.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

      const result = await updateUserService.execute(userId, userData);

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      const userId = 999;
      const userData = {
        name: 'Non-existent User',
        email: 'nonexistent@email.com',
      } as UpdateUserRequestDTO;

      vi.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

      await expect(
        updateUserService.execute(userId, userData),
      ).rejects.toThrowError(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw ConflictException when updating document type without document number', async () => {
      const userId = 1;
      const userData = {
        documentType: 'CPF',
      } as UpdateUserRequestDTO;

      vi.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(
        updateUserService.execute(userId, userData),
      ).rejects.toThrowError(ConflictException);
      expect(userRepository.findById).toHaveBeenCalledTimes(0);
    });

    it('should throw ConflictException when updating isBrasilian without document information', async () => {
      const userId = 1;
      const userData = {
        isBrasilian: true,
      } as UpdateUserRequestDTO;

      vi.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(
        updateUserService.execute(userId, userData),
      ).rejects.toThrowError(ConflictException);
      expect(userRepository.findById).toHaveBeenCalledTimes(0);
    });
  });
});
