import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  siteLanguage: string = 'EN';

  siteLocale: string;

  languageList: any = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.siteLanguage = this.languageList.find((el) => el.code === lang)?.label || 'EN';
  }
}
