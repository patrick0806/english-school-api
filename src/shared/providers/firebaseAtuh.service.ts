import { HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { FirebaseAuthException } from '@shared/exceptions/FirebaseAuthException';

@Injectable()
export class FirebaseAuthService {
  async createUser(email: string): Promise<string> {
    try {
      const user = await firebase.auth().createUser({ email });
      return user.uid;
    } catch (error) {
      throw new FirebaseAuthException(
        HttpStatus.CONFLICT,
        error.errorInfo.message,
      );
    }
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    try {
      await firebase.auth().updateUser(userId, { password });
    } catch (error) {
      throw new FirebaseAuthException(
        HttpStatus.BAD_REQUEST,
        error.errorInfo.message,
      );
    }
  }

  async deleteUser(userId: string): Promise<void> {
    await firebase.auth().deleteUser(userId);
  }

  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    return firebase.auth().verifyIdToken(token);
  }
}
