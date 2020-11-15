import { Component } from '@angular/core';
import { AuthQuery } from './auth/+state/auth.query';
import { AuthService } from './auth/+state/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$ = this.authQuery.isLoggedIn$;
  name$ = this.authQuery.name$;

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
  ) { }

  logout() {
    this.authService.logout();
  }
}
