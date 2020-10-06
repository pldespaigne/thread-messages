
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MessageComponent } from './message.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule, MatExpansionModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    FlexModule,

    MatIconModule,
    MatExpansionModule,
    MatCardModule,
  ],
  exports: [MessageComponent],
})
export class MessageModule { }
