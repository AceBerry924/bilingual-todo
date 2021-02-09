import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/_services/auth.service';
import { DirectionService } from 'src/app/_services/direction.service';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  siteLanguage = 'EN';
  siteLocale: string;
  isDarkTheme: Observable<boolean>;

  languageList: any = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];


  constructor(
    public auth: AuthService,
    public dir: DirectionService,
    private themeService: ThemeService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    console.log(this.themeService.isDarkTheme);
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.siteLanguage = this.languageList.find((el) => el.code === lang)?.label || 'EN';

    this.dir.changeSiteDirection('ltr');

    if (lang === 'he') {
      this.dir.changeSiteDirection('rtl');
    }
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  logout(): void {
    this.auth.logout();
  }
}
