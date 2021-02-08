import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from '../../_services/direction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  siteLanguage = 'EN';
  siteLocale: string;

  languageList: any = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];


  constructor(
    public translate: TranslateService,
    public dir: DirectionService,
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
}
