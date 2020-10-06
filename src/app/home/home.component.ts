import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thread } from '../thread/+state/thread.store';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  threads: Thread[] = [
    { id: '0', name: 'Room' },
    { id: '1', name: 'Video' },
    { id: '2', name: 'VOD' },
    { id: '3', name: 'Export' },
  ];

}
