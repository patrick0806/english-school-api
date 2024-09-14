import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '@shared/repositories';

import { UpdateUserRequestDTO } from './dtos/request.dto';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, userData: UpdateUserRequestDTO) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException({
        error: 'Not found',
        message: 'User not found',
      });
    }

    this.validateUpdateConstraints(userData);
    Object.assign(user, userData);
    return this.userRepository.save(user);
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
