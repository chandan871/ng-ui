import { Injectable } from '@angular/core';
import { Login, Users } from 'projects/lib-core/src/public-api';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<any>;

  constructor() { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
  * Method used to login user
  * @param login credential {object}
  * @returns Users or Error
  */
  public login(loginCredential: Login): boolean {
    const getAllUsers = JSON.parse(localStorage.getItem('users'));
    let isUserLogged = false;
    const user = getAllUsers.filter((user) => {
      if (user.email == loginCredential.email) {
        return user;
      }
    })
    if(user.length > 0) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      isUserLogged = true;
      return isUserLogged;
    } else {
      isUserLogged = false;
    }
}
 /**
  * Method used logout
  * @param empty
  * @returns void
  */
 public logout(): void {
    // TODO: Uncomment below
    //localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
 }
 }
