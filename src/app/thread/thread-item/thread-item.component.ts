import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Thread } from '../+state/thread.store';


@Component({
  selector: '[thread] thread-item',
  templateUrl: './thread-item.component.html',
  styleUrls: ['./thread-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadItemComponent {

  @Input() thread: Thread;

}
