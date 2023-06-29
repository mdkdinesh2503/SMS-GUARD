import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ActivateGuard implements CanActivate {

  constructor(private auth:AuthService, private route:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.auth.isUserLogin()) {
        alert("You are not login to view this page !!");
        this.route.navigate(['login'], {queryParams: {retUrl:route.url}});
        return false;
      } else {
        return true;
      }

  }

}
