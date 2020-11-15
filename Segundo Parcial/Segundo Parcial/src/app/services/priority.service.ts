import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private apiUrl = 'https://utn-lubnan-api-2.herokuapp.com/api/Priority';

  constructor(private http: HttpClient) { }

  getAll():Promise<any>{
    return this.http.get(this.apiUrl).toPromise();
  }

}
