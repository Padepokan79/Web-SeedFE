import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.auth.isLoggedIn();
    if (isLoggedIn) {
      console.log('Authorized');
      return true;
    } else {
      console.log('Unauthorized');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //  this.router.navigate(['unauthorized']);
      return false;
    }
  }
}
