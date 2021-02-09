import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from './_services/direction.service';
import { ThemeService } from 'src/app/_services/theme.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bilingual-todo';
  isDarkTheme: Observable<boolean>;

  constructor(
    public dir: DirectionService,
    private themeService: ThemeService,
    private translate: TranslateService,

  ) {
    this.translate.addLangs(['en', 'nl']);
    this.translate.setDefaultLang('en');
    console.log('home constructor', this.themeService.isDarkTheme);
  }

  ngOnInit(): void {
    console.log('home ngOniti', this.themeService.isDarkTheme);
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
