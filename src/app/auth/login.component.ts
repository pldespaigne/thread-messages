import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './+state/auth.service';


@Component({
  selector: 'login-page',
  templateUrl : './login.component.html',
  styleUrls: [ './login.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  signIn() {
    if (this.form.valid) {
      this.authService.signIn(this.form.get('name').value, this.form.get('password').value);
      this.router.navigateByUrl('/');
    }
  }
}
