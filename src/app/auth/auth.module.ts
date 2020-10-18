import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { SignupPageComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      }
    ],
  }
];

@NgModule({
  declarations: [ LoginPageComponent, SignupPageComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
  ],
  exports: [ LoginPageComponent, SignupPageComponent ]
})
export class AuthModule {}
