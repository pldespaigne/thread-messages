import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { firestore, functions } from 'firebase';

import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root'})
export class AuthService {

  functions: functions.Functions;
  db: firestore.Firestore;

  constructor(
    private authStore: AuthStore,
    fireFirestore: AngularFirestore,
    fireFunctions: AngularFireFunctions,
  ) {

    // Override Firebase to use local emulator

    this.functions = fireFunctions.functions;
    this.functions.useFunctionsEmulator('http://localhost:5001');

    this.db = fireFirestore.firestore;
    this.db.settings({
      host: 'localhost:8080',
      ssl: false,
    });
  }

  async signIn(name: string, password: string) {

    const userRef = this.db.doc(`users/${name}`);
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      const user = userSnap.data();

      if (user.password === password) {
        console.log(user);
        window.localStorage.setItem('credentials', JSON.stringify({ name, password }));
        this.authStore.update(state => ({ id: user.okiniri.id, name, isSeller: user.isSeller }));
      } else {
        console.log('wrong password');
      }
    } else {
      console.warn('user doesn\'t exists');
    }
  }

  recoverSignIn() {
    const credentials = window.localStorage.getItem('credentials');
    if (!!credentials) {
      const { name, password } = JSON.parse(credentials);
      if (!!name && !!password) {
        this.signIn(name, password);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async isUsernameTaken(name: string) {
    const userRef = this.db.doc(`users/${name}`);
    const userSnap = await userRef.get();
    return userSnap.exists;
  }

  async signUp(name: string, password: string, isSeller: boolean) {

    const createUser = this.functions.httpsCallable('createUser');
    const { data: response } = await createUser({name, password, isSeller});

    if (!!response.error) {
      throw new Error(`${response.error}: ${response.result}`);
    } else {
      console.log(response.result);
      window.localStorage.setItem('credentials', JSON.stringify({ name, password: response.result.password }));
      this.authStore.update(state => ({ id: response.result.password, name, isSeller: response.result.isSeller }));
    }
  }
}
