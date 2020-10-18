import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../+state/auth.service';


export function isUsernameTaken(authService: AuthService): AsyncValidatorFn {
  return async (control: FormControl): Promise<{[key: string]: any} | null> => {
    console.log('checking name', control.value);
    const isTaken = await authService.isUsernameTaken(control.value);
    console.log('taken', isTaken);
    return isTaken ? { nameIsTaken: true } : null;
  };
}
export function passwordMatch(): ValidatorFn {
  return (form: FormGroup): {[key: string]: any} | null => {
    const password = form.get('password').value;
    const confirmation = form.get('passwordConfirm').value;
    return password === confirmation ? null : { confirmationMismatch: true };
  };
}

@Component({
  selector: 'signup-page',
  templateUrl : './signup.component.html',
  styleUrls: [ './signup.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {

  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required], [isUsernameTaken(this.authService)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(''),
      isSeller: new FormControl(false),
    },
    [passwordMatch()]
  );

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async signUp() {
    if (this.form.valid) {
      await this.authService.signUp(this.form.get('name').value, this.form.get('password').value, this.form.get('isSeller').value);
      this.router.navigateByUrl('/');
    }
  }
}
