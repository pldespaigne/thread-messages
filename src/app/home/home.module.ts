
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ThreadModule } from '../thread/thread.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  }
];

@NgModule({
  declarations: [ HomePageComponent ],
  imports: [
    CommonModule,

    FlexLayoutModule,

    ThreadModule,

    RouterModule.forChild(routes),
  ],
  exports: [ HomePageComponent ],
})
export class HomePageModule {}
