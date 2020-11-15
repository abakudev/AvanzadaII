import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/category,model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList = Array<Product>();
  
  @Input() filters: Array<ProductCategory>;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {

    this.productService.getall()
    .then(response =>{
        this.productList = response
    })
    .catch(error =>{
      console.error();
    })

  }


  ngOnChanges(): void {
    
    this.productList = []

    this.productService.getall()
    .then(response =>{
      if (this.filters.length == 0){
        this.productList = response
      }
      else{
        let products: Array<Product> = response; 
        for (let i = 0; i < this.filters.length; i++) {
            for (let p = 0; p < products.length; p++) {
              if (products[p].productCategoryId == this.filters[i].productCategoryId){
                this.productList.push(products[p]);
              }
            }
        }
      }
    })
    .catch(error =>{
      console.error();
    })

  }
}
