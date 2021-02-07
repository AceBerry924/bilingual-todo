import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  siteDirection = 'ltr';

  constructor() { }

  changeSiteDirection(lang: string) {
    this.siteDirection = lang;
  }
}
