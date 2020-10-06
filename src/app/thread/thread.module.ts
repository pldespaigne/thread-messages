import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MessageModule } from '../message/message.module';

import { ThreadItemComponent } from './thread-item/thread-item.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';

const routes: Routes = [
  {
    path: ':threadId',
    component: ThreadPageComponent,
  },
];

@NgModule({
  declarations: [
    ThreadItemComponent,
    ThreadPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MessageModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    RouterModule.forChild(routes),
  ],
  exports: [
    ThreadItemComponent,
    ThreadPageComponent,
  ]
})
export class ThreadModule {}
