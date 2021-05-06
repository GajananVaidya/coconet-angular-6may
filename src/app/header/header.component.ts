import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: any;
  constructor(private authSvc: AuthService) { }
  logout() {
    this.authSvc.logout();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userName = user.user.firstName + " " + user.user.lastName;
    }
  }
}
