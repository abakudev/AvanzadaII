import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/category,model';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categoryList: Array<ProductCategory>;
  
  @Output() 
  selectedFilterEvent = new EventEmitter<Array<ProductCategory>>();

  constructor(private categoryService: ProductCategoryService) { }

  ngOnInit(): void {

    this.categoryService.getall()
    .then( response =>{
      this.categoryList = response;
    })
    .catch( error => {
      console.log(error);
    })
  }

  dofilter(){

    let filterList = new Array<ProductCategory>();
    event.preventDefault();
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].checked == true){
            let category = new ProductCategory();
            category.productCategoryId = parseInt(inputs[i].id);
            category.description =  inputs[i].value;
            filterList.push(category);
        }
    }

    this.selectedFilterEvent.emit(filterList);
  }
}
