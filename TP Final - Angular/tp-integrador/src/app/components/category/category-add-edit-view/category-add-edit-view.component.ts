import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/common/custom-validators';
import { ProductCategory } from 'src/app/models/category,model';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-category-add-edit-view',
  templateUrl: './category-add-edit-view.component.html',
  styleUrls: ['./category-add-edit-view.component.css']
})
export class CategoryAddEditViewComponent implements OnInit {

  mode:string;
  message:string;
  category: ProductCategory;
  categoryId:number;
  
  categoryForm = new FormGroup({
    description: new FormControl("", [ Validators.required, CustomValidators.lettersOnly()])
  })

  constructor(private categoryService: ProductCategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.route.snapshot.url[1].path;
    this.mode = this.mode[0].toUpperCase() + this.mode.slice(1);
   
    if (this.categoryId > 0)
    {
      this.categoryService.getById(this.categoryId)
      .then(response => {
        this.category = response;
        this.categoryForm.controls['description'].setValue(this.category.description);

        if(this.mode == 'View'){
          this.categoryForm.controls['description'].disable();
        }
    })
      .catch(error => {
        console.log(error);
      })
    }
  }

  get description() { return this.categoryForm.get('description'); }

  onSubmit(){
    let category = new ProductCategory();
    category.productCategoryId = this.categoryId
    category.description = this.categoryForm.get('description').value;
    
    if (this.mode == 'Add'){
      this.categoryService.add(category)
        .then(response  => {
          this.message = "Category successfully added";
          this.limpiacampos();
        })
        .catch(error =>{
          this.message = "An error has occurred!";
        })
    }else{

      this.categoryService.edit(category)
        .then(response  => {
          this.message = "Category successfully edited";

          this.limpiacampos();
        })
        .catch(error =>{
          this.message = "An error has occurred!";
        })
    }
  }

  limpiacampos(){
    setTimeout(() => {
      this.message = "";
    }, 3000);

  }
}
