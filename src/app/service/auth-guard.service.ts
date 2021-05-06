import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // return this.auth.isLoggedIn 
    //   .pipe(
    //     take(1),
    //     map((isLoggedIn: boolean) => {
    //       if (!isLoggedIn){
    //         this.router.navigate(['/login']);
    //         return false;
    //       }
    //       return true;
    //     })
    //   );
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    const localObj = localStorage.getItem('user');
    if (localObj && localObj != 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user);
      if (user) {
        const status = user.user.companyId.status;
        const type = user.user.companyId.type;
        // if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        //   this.router.navigate(['/home']);
        //   return false;
        // }
        // if(type == 'Buyer' && status === 'Inactive') {
        //   this.router.navigateByUrl('/company-details/account-settings');
        //   return false;
        // }
        // else if(type == 'Seller' && status === 'Inactive') {
        //   this.router.navigateByUrl('/company-details/seller-account-settings');
        //   return false;
        // }
        // this.router.navigate(['/']);
        this.auth.loggedIn.next(true);
        return true; 
      }
      else {
        // this.router.navigateByUrl('/login');
        return false;
      }
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
    
  }
}
