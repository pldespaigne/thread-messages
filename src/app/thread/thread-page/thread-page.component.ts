import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/message/+state/message.store';
import { Thread } from '../+state/thread.store';


@Component({
  selector: 'thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadPageComponent implements OnInit {

  thread: Thread = { id: '0', name: 'Room' };

  messages: Message[] = [
    {
      text: 'Cupcake ipsum dolor sit amet. I love macaroon bonbon cake liquorice muffin sweet roll halvah liquorice. Jelly-o cookie croissant soufflé pudding cupcake liquorice. Cookie cheesecake marshmallow I love chocolate bar. Donut lollipop fruitcake caramels tiramisu brownie caramels. Jelly beans jelly beans gummies chocolate cake.',
      author: 'Elon Musk',
      timestamp: 1601829568,
      isApproved: true,
      answersCount: 0,
      answers: [],
    },
    {
      text: 'Cupcake ipsum dolor sit amet. I love macaroon bonbon cake liquorice muffin sweet roll halvah liquorice. Jelly-o cookie croissant soufflé pudding cupcake liquorice. Cookie cheesecake marshmallow I love chocolate bar. Donut lollipop fruitcake caramels tiramisu brownie caramels. Jelly beans jelly beans gummies chocolate cake.',
      author: 'Bill Gates',
      timestamp: 1601429568,
      isApproved: false,
      answersCount: 2,
      answers: [
        {
          text: 'Cupcake ipsum dolor sit amet. I love macaroon bonbon cake liquorice muffin sweet roll halvah liquorice. Jelly-o cookie croissant soufflé pudding cupcake liquorice. Cookie cheesecake marshmallow I love chocolate bar. Donut lollipop fruitcake caramels tiramisu brownie caramels. Jelly beans jelly beans gummies chocolate cake.',
          author: 'Elon Musk',
          timestamp: 1601829568,
          isApproved: true,
          answersCount: 1,
          answers: [
            {
              text: 'Cupcake ipsum dolor sit amet. I love macaroon bonbon cake liquorice muffin sweet roll halvah liquorice. Jelly-o cookie croissant soufflé pudding cupcake liquorice. Cookie cheesecake marshmallow I love chocolate bar. Donut lollipop fruitcake caramels tiramisu brownie caramels. Jelly beans jelly beans gummies chocolate cake.',
              author: 'Elon Musk',
              timestamp: 1601829568,
              isApproved: false,
              answersCount: 0,
              answers: [],
            },
          ],
        },
        {
          text: 'Cupcake ipsum dolor sit amet. I love macaroon bonbon cake liquorice muffin sweet roll halvah liquorice. Jelly-o cookie croissant soufflé pudding cupcake liquorice. Cookie cheesecake marshmallow I love chocolate bar. Donut lollipop fruitcake caramels tiramisu brownie caramels. Jelly beans jelly beans gummies chocolate cake.',
          author: 'Jeff Bezos',
          timestamp: 1601821468,
          isApproved: false,
          answersCount: 0,
          answers: [],
        },
      ],
    },
  ];

  newMessage = new FormControl('');

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
  }
}
