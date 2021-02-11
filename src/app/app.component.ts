import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
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
    @Inject(LOCALE_ID) private locale: string,

  ) {
    this.translate.addLangs(['en', 'nl']);
    this.translate.setDefaultLang('en');

    if (this.locale === 'he') {
      this.dir.changeSiteDirection('rtl');
    }
    else {
      this.dir.changeSiteDirection('ltr');
    }
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
