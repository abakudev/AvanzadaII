import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private apiUrl = 'https://utn-lubnan-api-1.herokuapp.com/api/Incident';

  constructor(private http: HttpClient) { }

  getAll():Promise<any>{
    return this.http.get(this.apiUrl).toPromise();
  }

  add( incident: Incident ){

    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiUrl, incident, httpOption).toPromise();
  }

}
