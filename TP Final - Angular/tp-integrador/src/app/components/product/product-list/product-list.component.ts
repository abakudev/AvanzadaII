import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/category,model';
import { Product } from 'src/app/models/product.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = Array<Product>();
  categoryList = Array<ProductCategory>();
  ordenado = 0;

  constructor(private productService : ProductService, private categoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProducts("");
  }

  delete(id:number){
    this.productService.delete(id)
    .then(response =>{
      window.alert(`El producto ${id} se elimino correctamente`);
      this.ngOnInit();
    })
    .catch(error =>{
      console.error(error);
    });
  }

  sort(){
    
      let name = document.getElementById("name")
      if(this.ordenado == 0){
        this.productList.sort((a,b) => (a.name > b.name ? 1 : -1));
        name.className = "sortorder";
          this.ordenado = 1;        
      } else{
        this.productList.sort((a,b) => (a.name < b.name ? 1 : -1));
          name.className = "sortorder reverse";
          this.ordenado = 0;
      }
  }

  getProducts(termino:string){
    let productListAux = Array<Product>();
    
    //listado productos
    this.productService.getall()
    .then(response =>{
      
      // let productos = Array<Product>();
      this.productList = response;
     
      //listado categorias
      this.categoryService.getall()
      .then(response =>{
        this.categoryList = response;


        //Merge clasico
        for (let i = 0; i < this.productList.length; i++) {
          for (let e = 0; e < this.categoryList.length; e++) {
            
              if (this.productList[i].productCategoryId == this.categoryList[e].productCategoryId){
                   this.productList[i].productCategoryName = this.categoryList[e].description;
              }
          }
        }

        // //dejando solo los que existe la categoria
        // let productos = Array<Product>();
        // for (let i = 0; i < this.productList.length; i++) {
        //     for (let e = 0; e < this.categoryList.length; e++) {
              
        //         if (this.productList[i].productCategoryId == this.categoryList[e].productCategoryId){
        //              this.productList[i].productCategoryName = this.categoryList[e].description;
        //              let producto = new Product();
        //              producto = this.productList[i];
        //              productos.push(producto);     
        //         }
        //     }
        // }

        // this.productList = [];
        // this.productList = productos;

        for(let product of this.productList){
          let nombre = product.name.toLowerCase();
          
          if(nombre.indexOf(termino.toLowerCase()) >= 0){
            productListAux.push(product);
          }
        }  
        this.productList = productListAux;
      })

    })
    .catch(error =>{
      console.log(error);
    })    
    
  }
}

