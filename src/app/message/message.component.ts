import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Message } from './+state/message.store';

@Component({
  selector: '[message] message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {

  @Input() message: Message;

  isClosed = true;
}
