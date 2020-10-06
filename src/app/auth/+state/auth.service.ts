import { Injectable } from '@angular/core';

import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
  ) { }

  signIn(name: string, password: string) {
    window.localStorage.setItem('credentials', JSON.stringify({ name, password }));
    this.authStore.update(state => ({ id: password, name }));
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
}
