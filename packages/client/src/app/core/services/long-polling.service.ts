import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {timer, SubscriptionLike, Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LongPollingService {
  constructor(private http: HttpClient) {}

  isOnline = new BehaviorSubject<boolean>(true);
  changeInternetConnectionHandler = this.changeInternetConnection.bind(this);
  private customTimer: Observable<number> = timer(0, 500);
  private longPollingSubscription: SubscriptionLike;
  public networkConnectionStatus = window.navigator.onLine;

  private changeInternetConnection() {
    this.networkConnectionStatus = window.navigator.onLine;

    this.getOnlineStatus.subscribe((isOnline) => {
      if (this.networkConnectionStatus && isOnline) {
        this.startLongPolling();
      } else {
        this.cancelLongPolling();
      }
    });
  }

  private longPollingRequest() {
    return this.http.get('long-polling', {responseType: 'text'});
  }

  statusChanger(status: boolean): void {
    this.isOnline.next(status);
    this.getOnlineStatus.subscribe((isOnline) => {
      if (isOnline) {
        this.startLongPolling();
      } else {
        this.cancelLongPolling();
      }
    });
  }

  private restartLongPolling(): void {
    this.longPollingSubscription.unsubscribe();
    this.startLongPolling();
  }

  startLongPolling(): void {
    if (
      (!this.longPollingSubscription ||
        this.longPollingSubscription.closed
      ) &&
      this.networkConnectionStatus
    ) {
      this.longPollingSubscription = this.customTimer
        .pipe(this.longPollingRequest.bind(this))
        .subscribe(() => {
            console.log('!Success!');
          },
          () => {
            this.restartLongPolling();
          },
          () => {
            this.restartLongPolling();
          });
    }
  }

  cancelLongPolling(): void {
    if (this.longPollingSubscription && !this.longPollingSubscription.closed) {
      this.longPollingSubscription.unsubscribe();
    }
  }

  watchInternetConnection(): void {
    window.addEventListener('offline', this.changeInternetConnectionHandler);
    window.addEventListener('online', this.changeInternetConnectionHandler);
  }

  removeInternetConnectionWatchers(): void {
    window.removeEventListener('offline', this.changeInternetConnectionHandler);
    window.removeEventListener('online', this.changeInternetConnectionHandler);
  }

  triggerLongPolling() {
    return this.http.get('long-polling-trigger', {responseType: 'text'}).subscribe(() => {
    });
  }

   get isUserLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getOnlineStatus.subscribe((isOnline) => {
        if (isOnline && this.networkConnectionStatus) {
          return resolve(true);
        }
        return resolve(false);
      });
    });
  }

  get getOnlineStatus(): Observable<boolean> {
    return this.isOnline;
  }
}
