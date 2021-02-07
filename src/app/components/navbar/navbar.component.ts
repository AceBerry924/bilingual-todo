import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { TranslateService } from '@ngx-translate/core';
import { Directionality, Direction } from '@angular/cdk/bidi';

import { DirectionService } from '../../_services/direction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  siteLanguage: string = 'EN';
  siteLocale: string;
  private _dirChangeSubscription = Subscription.EMPTY;

  languageList: any = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];


  constructor(
    private translate: TranslateService,
    private direction: Directionality,
    public dir: DirectionService,
  ) {
    this._dirChangeSubscription = direction.change.subscribe(() => {
    });
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.siteLanguage = this.languageList.find((el) => el.code === lang)?.label || 'EN';

    this.dir.changeSiteDirection('ltr');

    if (lang === 'he') {
      this.dir.changeSiteDirection('rtl');
    }
  }
}
