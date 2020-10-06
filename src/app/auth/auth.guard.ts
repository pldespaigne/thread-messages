import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthQuery } from './+state/auth.query';
import { AuthService } from './+state/auth.service';

@Injectable({ providedIn: 'root' })
export class MustBeLoggedIn implements CanActivate {

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    this.authService.recoverSignIn();
    if (this.authQuery.isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl(`/login`);
    }
  }
}

