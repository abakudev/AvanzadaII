import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
   
  @Input() product: Product = new Product();
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    let productId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (productId >0){  
      this.productService.getById(productId)
      .then(response =>{
        this.product = response
      })
      .catch(error=>{
        console.error(error);
      })  
    }
  } 
}

