import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private db: AngularFirestore,
    private functions: AngularFireFunctions,
  ) { }

  async signIn(name: string, password: string) {

    const userRef = this.db.doc(`users/${name}`);
    const userSnap = await userRef.get().toPromise();

    if (userSnap.exists) {
      const user = userSnap.data();

      if (user.password === password) {
        console.log(user);
        window.localStorage.setItem('credentials', JSON.stringify({ name, password }));
        this.authStore.update(state => ({ id: password, name, isSeller: user.isSeller }));
      } else {
        console.log('wrong password');
      }
    } else {
      console.warn('user doesn\'t exists');
    }

    // window.localStorage.setItem('credentials', JSON.stringify({ name, password }));
    // this.authStore.update(state => ({ id: password, name }));
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
    const userSnap = await userRef.get().toPromise();
    return userSnap.exists;
  }

  async signUp(name: string, password: string, isSeller: boolean) {

    // const userRef = this.db.doc(`users/${name}`);
    // const userSnap = await userRef.get().toPromise();
    // if (userSnap.exists) {
    //   throw new Error(`User ${name} already exists`);
    // }

    // userRef.set({password, isSeller});

    const createUser = this.functions.httpsCallable('createUser');
    const response = await createUser({name, password, isSeller}).toPromise();

    if (!!response.error) {
      throw new Error(`${response.error}: ${response.result}`);
    } else {
      console.log(response.result);
      window.localStorage.setItem('credentials', JSON.stringify({ name, password: response.result.password }));
      this.authStore.update(state => ({ id: response.result.password, name, isSeller: response.result.isSeller }));
    }
  }
}
