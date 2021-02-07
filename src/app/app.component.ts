import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from './_services/direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bilingual-todo';

  constructor(
    private translate: TranslateService,
    public dir: DirectionService

  ) {
    this.translate.addLangs(['en', 'nl']);
    this.translate.setDefaultLang('en');
  }
}
