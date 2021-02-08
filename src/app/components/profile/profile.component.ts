import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  defaultImage = 'https://via.placeholder.com/420x320';

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getAbbr(name: string): string {
    return name.match(/\b([A-Z])/g).join('');
  }

}
