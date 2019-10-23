import {Component, OnInit, OnDestroy} from '@angular/core';
import {SubscriptionLike} from 'rxjs';


import {NumberService} from '../../../core/services/number.service';

@Component({
  selector: 'app-second-part',
  templateUrl: './second-part.component.html',
  styleUrls: ['./second-part.component.scss']
})
export class SecondPartComponent implements OnInit, OnDestroy {
  constructor(private numberService: NumberService) {
  }

  public numberList: number[] = [];
  private getNumbersSubscriber: SubscriptionLike;

  ngOnInit() {
    this.getNumbersSubscriber = this.numberService.getNumbers.subscribe((numberList) => {
      this.numberList = numberList;
    });
  }

  ngOnDestroy() {
    this.numberService.unsubscribe();
    if (this.getNumbersSubscriber) {
      this.getNumbersSubscriber.unsubscribe();
    }
  }
}
