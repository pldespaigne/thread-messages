
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';

import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

  constructor(protected store: AuthStore) {
    super(store);
  }

  get isLoggedIn() {
    return this.getValue().id !== '';
  }

  get isLoggedIn$() {
    return this.select('id').pipe(map(id => id !== ''));
  }

  get name$() {
    return this.select('name');
  }

  get isOwner() {
    return this.getValue().name === 'Owner';
  }

}
