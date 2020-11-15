import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/UserType';

  constructor( private http: HttpClient) { 
    
  }

  get(): Promise<any>{
    return this.http.get(this.apiURL).toPromise();
  }

  getById(id: number): Promise<any>{
    return this.http.get(`${this.apiURL}/${id}`).toPromise();
  }
}
