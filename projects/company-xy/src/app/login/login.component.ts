import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/lib-core/src/lib/services/authentication/auth.service';
import { CompanyService, LOGIN_CONTENT, Users } from 'projects/lib-core/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * used to store login from
   */
  public loginForm: FormGroup;
  /**
   * stores login submission status
   */
  public submitted: boolean;
  /**
   * used to check login error
   */
  public loginError: boolean;
  /**
   * used to destroy subscription event
   */
  private ngUnSubscribe: Subject<void>
  /**
   * used to destroy subscription event
   */
  public content: any;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService) { 
      this.ngUnSubscribe = new Subject<void>();
      this.content = LOGIN_CONTENT;
    }

  ngOnInit(): void {
    this.fetchUser();
    this.submitted = false;
    this.loginForm = this.fb.group({
      email: ['rahul@gmail.com', Validators.required],
      password: ['Pass@word1', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
  });
  }

  /**
   * Method to allow user to login
   * @returns void
   */
  public onSubmit(): void{
    this.submitted = true;
    this.loginError = false;
    if(!this.loginForm.valid) return;
    const isUserAuthenticated = this.authService.login(this.loginForm.value);
    isUserAuthenticated ? this.router.navigateByUrl('/dashboard'): this.loginError = true; 
  }

  /**
   * method to fetch all users
   * @returns void
   */
   private fetchUser(): void {
    this.companyService.getAllUser().pipe(
      takeUntil(this.ngUnSubscribe.asObservable())).subscribe(() => {  
      }), ((error: any) => {
      })
  }
  /**
   * method to unsubscribe from observables
   * @returns void
   */
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
