import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError as observableThrowError, Observable } from 'rxjs';
import * as HttpUrl from '../../../../.././company-xy/config.json';
import { map, catchError } from 'rxjs/operators';
import { API_MAP } from '../../proxies/common-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private api = HttpUrl.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

  /**
   * method used to fetch list of movies
   * @param user id
   * @returns results
   */
   public deleteContacts(payload: string): Observable<any> {
    return this.http.post(`${this.api}${API_MAP.deleteContact.url}`, payload).pipe(
      map((response: HttpResponse<any>) => {
        return response.body;
      }), catchError((error: HttpErrorResponse) => {
        return observableThrowError (error);
      })
    )
  }
}


