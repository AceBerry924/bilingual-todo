import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

  getAbbr(name: string): string {
    return name.match(/\b([A-Z])/g).join('');
  }

  formattedUrl(url): any {
    return this.domSanitizer.bypassSecurityTrustStyle('url(' + url + ')');
  }

}
