import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/category,model';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList = Array<ProductCategory>();
  ordenado = 0;

  constructor(private categoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getCategories("");  
  }

  sort(){
    let description = document.getElementById("description")
    if(this.ordenado == 0){
      this.categoryList.sort((a,b) => (a.description > b.description ? 1 : -1));
      description.className = "sortorder";
        this.ordenado = 1;        
    } else{
      this.categoryList.sort((a,b) => (a.description < b.description ? 1 : -1));
        description.className = "sortorder reverse";
        this.ordenado = 0;
    }
  }

  getCategories(termino:string){
    let categoryListAux = Array<ProductCategory>();
    
    this.categoryService.getall()
    .then(response =>{
      this.categoryList = response;

      for(let category of this.categoryList){
        let description = category.description.toLowerCase();
        
        if(description.indexOf(termino.toLowerCase()) >= 0){
          categoryListAux.push(category);
        }
      }  
      this.categoryList = categoryListAux;

    })
    .catch(error =>{
      console.error(error);
    })
  }

}
