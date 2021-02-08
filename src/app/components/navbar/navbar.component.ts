import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/_services/auth.service';
import { DirectionService } from 'src/app/_services/direction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  siteLanguage = 'EN';
  siteLocale: string;
  loggedIn = false;

  languageList: any = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];


  constructor(
    public auth: AuthService,
    public dir: DirectionService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.siteLanguage = this.languageList.find((el) => el.code === lang)?.label || 'EN';

    this.dir.changeSiteDirection('ltr');

    if (lang === 'he') {
      this.dir.changeSiteDirection('rtl');
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
