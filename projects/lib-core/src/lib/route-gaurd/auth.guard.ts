import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authenticationService: AuthService
) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      let currentUser;
      this.authenticationService.currentUser.subscribe((user)=>{
        currentUser = user;
      });
      if (currentUser) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
