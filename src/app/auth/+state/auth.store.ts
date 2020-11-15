import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export interface AuthState {
  /** Okiniri user ID */
  id: string;
  /** user name */
  name: string;
  /** Okiniri user secret */
  secret: string;
}

function createAuthState(): AuthState {
  return {
    id: '',
    name: '',
    secret: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createAuthState());
  }
}
