import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  storedTheme = localStorage.getItem('theme');
  darkTheme: Subject<boolean> = new BehaviorSubject(this.storedTheme === 'dark');
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }
}
