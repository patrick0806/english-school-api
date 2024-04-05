import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as firebase from 'firebase-admin';

import { User } from '@shared/entities';

@Injectable()
export class SignInService {
  constructor(private jwtService: JwtService) {}
  async execute(firebaseUserToken: string) {
    try {
      const decodedFirebaseToken = await firebase
        .auth()
        .verifyIdToken(firebaseUserToken);

      const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(decodedFirebaseToken.uid)
        .get();

      const user = User.fromFirestore(snapshot);

      return this.jwtService.sign({
        email: user.email,
        name: user.name,
        sub: user.id,
      });
    } catch (error) {
      return;
    }
  }
}
