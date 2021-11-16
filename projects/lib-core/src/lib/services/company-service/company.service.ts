import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as HttpUrl from '../../../../.././company-xy/config.json';
import { API_MAP } from '../../proxies/common-api-endpoints';
import { Company, ContactList, Users } from 'projects/lib-core/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private api = HttpUrl.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * method used to fetch list of all user
   * @returns Observable<Object>
   */
   public getAllUser(): Observable<Users> {
    return this.http.get(`${this.api}${API_MAP.getAllUser.url}`).pipe(
      map((response: HttpResponse<Users>) => {
        localStorage.setItem('users', JSON.stringify(response));
        return response.body;
      }), catchError((error: HttpErrorResponse) => {
        return observableThrowError (error);
      })
    )
  }
  
/**
   * method used to fetch list of movies
   */
 public getCompaniesAndContacts(): Observable<[Company, ContactList]> {
  const companyList = this.http.get(`${this.api}${API_MAP.getAllCompanies.url}`).pipe(
    map((response: Company) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return observableThrowError (error);
    })
  )
  const contactList = this.http.get(`${this.api}${API_MAP.getContacts.url}`).pipe(
    map((response: ContactList) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return observableThrowError (error);
    })
  )
  return forkJoin([companyList, contactList]);
 }

 /**
   * method used to fetch list of movies
   * @returns userdata
   */
  public postContacts(payload): Observable<any> {
    return this.http.post(`${this.api}${API_MAP.saveContact.url}`, payload).pipe(
      map((response: HttpResponse<any>) => {
        return response.body;
      }), catchError((error: HttpErrorResponse) => {
        return observableThrowError (error);
      })
    )
  }
}
