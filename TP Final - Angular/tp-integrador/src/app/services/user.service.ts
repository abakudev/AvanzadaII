import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/User';

  constructor( private http: HttpClient) { 
    
  }

  get(): Promise<any>{
    return this.http.get(this.apiURL).toPromise();
  }

  post(userLogin: UserLogin): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };

    return this.http.post(this.apiURL,userLogin,httpOptions).toPromise();
  }

}