import {Component, OnInit, OnDestroy} from '@angular/core';
import {LongPollingService} from '../../../core/services/long-polling.service';

@Component({
  selector: 'app-main',
  templateUrl: './first-part.component.html',
  styleUrls: ['./first-part.component.scss'],
})
export class FirstPartComponent implements OnInit, OnDestroy {
  public checked: boolean;

  constructor(private longPollingService: LongPollingService) {
  }

  ngOnInit() {
    this.longPollingService.isOnline.subscribe((isOnline: boolean) => {
      this.checked = isOnline;
    });

    this.longPollingService.watchInternetConnection();
    this.longPollingService.startLongPolling();
  }

  ngOnDestroy() {
    this.longPollingService.removeInternetConnectionWatchers();
    this.longPollingService.cancelLongPolling();
  }

  get getNetworkConnection() {
    return this.longPollingService.networkConnectionStatus ? 'online' : 'offline';
  }

  onlineStatusChanger({checked}) {
    this.longPollingService.statusChanger(checked);
  }

  async getUserLoggedInStatus() {
    alert(`Your status: ${await this.longPollingService.isUserLoggedIn ? 'online' : 'offline'}`);
  }
}
