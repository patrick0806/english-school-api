import { HttpStatus, Injectable } from '@nestjs/common';

import { MailerSenderConnector } from '@shared/connectors';
import { User } from '@shared/entities';
import { FirebaseAuthException } from '@shared/exceptions/FirebaseAuthException';
import { FirebaseAuthService } from '@shared/providers/firebaseAtuh.service';
import { UserRepository } from '@shared/repositories/user.repository';
import { WelcomeTemplate } from '@shared/templates';

import { CreateUserRequestDTO } from './dtos/request.dto';
import { CreateUserResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateUserService {
  constructor(
    private mailerSender: MailerSenderConnector,
    private firebaseAuth: FirebaseAuthService,
    private userRepository: UserRepository,
  ) {}
  async execute(userDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const userId = await this.firebaseAuth.createUser(userDTO.email);

    const user: User = {
      ...userDTO,
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await this.userRepository.save(user);
    } catch (error) {
      await this.firebaseAuth.deleteUser(userId);
      throw new FirebaseAuthException(
        HttpStatus.BAD_REQUEST,
        error.errorInfo.message,
      );
    }

    await this.mailerSender.sendEmail(
      user.email,
      user.name,
      `Welcome ${user.name}`,
      WelcomeTemplate({ schoolName: user.school, name: user.name }),
    );

    return user;
  }
}
