import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { MailerSenderConnector } from '@shared/connectors';
import { UserRepository } from '@shared/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private mailerSender: MailerSenderConnector,
    private userRepository: UserRepository,
  ) {}
  async execute() {
    try {
      const authUser = await firebase.auth().createUser({
        email: 'jhondoe@me.com',
        password: '123456',
      });
      const user = {
        uid: authUser.uid,
        name: 'Jhon Doe',
        email: 'jhondoe@me.com',
        createdAt: new Date(),
      };
      await this.userRepository.save(user);

      await this.mailerSender.sendEmail(
        user.email,
        user.name,
        'Welcome',
        'Hello',
      ); //TODO change mensage
    } catch (err) {
      console.log(err);
    }
  }
}
