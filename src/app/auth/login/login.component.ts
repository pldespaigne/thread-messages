import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../+state/auth.service';


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

  wrongLogin$ = new BehaviorSubject(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async signIn() {
    if (this.form.valid) {
      const success = await this.authService.signIn(this.form.get('name').value, this.form.get('password').value);
      if (success) {
        this.router.navigateByUrl('/');
      } else {
        this.wrongLogin$.next(true);
        this.form.setErrors({ wrongLogin: true });
      }
    }
  }
}
