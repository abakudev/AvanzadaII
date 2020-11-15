import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private apiUrl = "https://utn-lubnan-api-2.herokuapp.com/api/Domain";

  constructor(private http: HttpClient) { }

  getAll():Promise<any>{
    return this.http.get(this.apiUrl).toPromise();
  }

  getById(name: string): Promise<any>{
    return this.http.get(`${this.apiUrl}/${name}` ).toPromise();
  }




}
