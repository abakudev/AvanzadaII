import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/category,model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/productcategory';

  constructor( private http: HttpClient) {     
  }

  getall(): Promise<any>{
    return this.http.get(this.apiURL).toPromise();
  }

  getById(id: number): Promise<any>{
    return this.http.get(`${this.apiURL}/${id}`).toPromise();
  }

  add(productCategory: ProductCategory ): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };

    return this.http.post(this.apiURL,productCategory,httpOptions).toPromise();
  }

  edit(productCategory: ProductCategory ): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };

    return this.http.put(this.apiURL,productCategory,httpOptions).toPromise();
  }
}
