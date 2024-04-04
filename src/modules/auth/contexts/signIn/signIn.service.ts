import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class SignInService {
  async execute(firebaseUserToken: string) {
    try {
      const user = await firebase.auth().verifyIdToken(firebaseUserToken);
      const data: any = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      console.log(data);
      return null;
    } catch (error) {
      return;
    }
  }
}
