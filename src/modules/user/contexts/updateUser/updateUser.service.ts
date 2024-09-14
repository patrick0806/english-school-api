import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { UserRepository } from '@shared/repositories';

import { UpdateUserRequestDTO } from './dtos/request.dto';
import { UpdateUserResponseDTO } from './dtos/response.dto';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    userId: number,
    userData: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    this.validateUpdateConstraints(userData);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException({
        error: 'Not found',
        message: 'User not found',
      });
    }

    Object.assign(user, userData);
    const updatedUser = await this.userRepository.save(user);
    return plainToClass(UpdateUserResponseDTO, updatedUser);
  }

  private validateUpdateConstraints(userData: UpdateUserRequestDTO) {
    if (userData.documentType && !userData.documentNumber) {
      throw new ConflictException({
        error: 'Conflict',
        message: 'If document type is to be updated, document must be informed',
      });
    }

    if (
      userData.isBrasilian &&
      !userData.documentNumber &&
      !userData.documentType
    ) {
      throw new ConflictException({
        error: 'Conflict',
        message: 'If nationality is to be informed, document must be informed',
      });
    }
  }
}
