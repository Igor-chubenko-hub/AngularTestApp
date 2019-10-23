import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  isDarkMode = localStorage.getItem('isDarkMode') === 'true';

  changeMode({checked: isDarkMode = false}) {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
    this.isDarkMode = isDarkMode;
  }
}
