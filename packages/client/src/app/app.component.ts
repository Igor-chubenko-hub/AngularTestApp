import { Component } from '@angular/core';
import {ThemeService} from './core/services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}
  title = 'angular-best-practices';
  navLinks = [
    {
      label: 'First part',
      url: '/quiz/first-part',
    }, {
      label: 'Second part',
      url: '/quiz/second-part',
    },
  ];
}
