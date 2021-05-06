import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coconet-angular';
  isLoggedIn$: any;
  // isLoggedIn$: boolean;
  constructor(public authSvc: AuthService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // this.userName = user.user.firstName + " " + user.user.lastName;
      // this.isLoggedIn$ = true;
      // this.cdr.detectChanges();
    }
    
    if(this.authSvc.loggedIn) {
      this.authSvc.loggedIn.subscribe(x=> this.isLoggedIn$ = x);
    }
    
  }
}
