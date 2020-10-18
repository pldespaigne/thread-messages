import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  id: string;
  name: string;
  isSeller: boolean;
}

function createAuthState(): AuthState {
  return {
    id: '',
    name: '',
    isSeller: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createAuthState());
  }
}
