import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/Product';

  constructor( private http: HttpClient) { 
    
  }

  getall(): Promise<any>{
    return this.http.get(this.apiURL).toPromise();
  }

  getById(id: number): Promise<any>{
    return this.http.get(`${this.apiURL}/${id}`).toPromise();
  }

  add(product: Product): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };

    return this.http.post(this.apiURL,product,httpOptions).toPromise();
  }

  edit(product: Product): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };
    return this.http.put(this.apiURL,product,httpOptions).toPromise();
  }

  delete(id: number): Promise<any>{
    return this.http.delete(`${this.apiURL}/${id}`).toPromise();
  }

}
