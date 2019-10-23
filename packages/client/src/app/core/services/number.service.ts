import {Injectable} from '@angular/core';
import {interval, Observable, Subject, SubscriptionLike} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NumberService {
  constructor() {
  }

  private numberGeneratorInterval: Observable<number> = interval(500);
  private numberSenderInterval: Observable<number> = interval(2000);
  numbers = new Subject<number[]>();
  numbersList: number[] = [];
  private numberGeneratorSubscriber: SubscriptionLike;
  private numberSenderIntervalSubscriber: SubscriptionLike;

  private pushItem(): void {
    this.numbersList.push(Math.random());
  }

  private startGeneratingNumbers(): void {
    this.numberGeneratorSubscriber = this.numberGeneratorInterval.subscribe(this.pushItem.bind(this));
  }

  private pushList(): void {
    this.numbers.next([...this.numbersList]);
  }

  private startSendNumbers(): void {
    this.numberSenderIntervalSubscriber = this.numberSenderInterval.subscribe(this.pushList.bind(this));
  }

  get getNumbers(): Observable<number[]> {
    this.startGeneratingNumbers();
    this.startSendNumbers();

    return this.numbers;
  }

  unsubscribe(): void {
    if (this.numberGeneratorSubscriber && this.numberGeneratorSubscriber.unsubscribe) {
      this.numberGeneratorSubscriber.unsubscribe();
    }
    if (this.numberSenderIntervalSubscriber && this.numberSenderIntervalSubscriber.unsubscribe) {
      this.numberSenderIntervalSubscriber.unsubscribe();
    }

    this.numbersList = [];
  }
}
