import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/common/custom-validators';
import { ProductCategory } from 'src/app/models/category,model';
import { Product } from 'src/app/models/product.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-edit-view',
  templateUrl: './product-add-edit-view.component.html',
  styleUrls: ['./product-add-edit-view.component.css']
})
export class ProductAddEditViewComponent implements OnInit {

  mode:string;
  message:string;
  categories: Array<ProductCategory>;
  product: Product;
  productId:number;

  productForm = new FormGroup({
    name: new FormControl("", [ Validators.required, CustomValidators.lettersOnly()]),
    description: new FormControl("", [ Validators.required, CustomValidators.lettersOnly()]),
    price: new FormControl("", [ Validators.required, CustomValidators.numbersOnly]),
    productCategoryId: new FormControl(""),
  })

  constructor(private productService: ProductService, private categoryService: ProductCategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.categoryService.getall()
    .then(response =>{
       this.categories = response;
    })
    .catch(error =>{
      console.log(error);  
    })

    //Mode Edit - view
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.route.snapshot.url[1].path;
    this.mode = this.mode[0].toUpperCase() + this.mode.slice(1);

    if (this.productId > 0)
    {
      this.productService.getById(this.productId)
      .then(response => {
        this.product = response;
    
        this.productForm.controls['name'].setValue(this.product.name);
        this.productForm.controls['description'].setValue(this.product.description);
        this.productForm.controls['price'].setValue(this.product.price);
        this.productForm.controls['productCategoryId'].setValue(this.product.productCategoryId);

        if(this.mode == 'View'){
          this.productForm.controls['name'].disable();
          this.productForm.controls['description'].disable();
          this.productForm.controls['price'].disable();
          this.productForm.controls['productCategoryId'].disable();
        }
    })
      .catch(error => {
        console.log(error);
      })
    }

  }

  //validators
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get productCategoryId() { return this.productForm.get('productCategoryId'); }
  
  onSubmit(){
    let product = new Product();
    product.productId = this.productId
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value;
    product.productCategoryId =  this.productForm.get('productCategoryId').value;

    if (this.mode == 'Add'){
      this.productService.add(product)
        .then(response  => {
          this.message = "Product successfully added";
        })
        .catch(error =>{
          this.message = "An error has occurred!";
        })
    }else{

      this.productService.edit(product)
        .then(response  => {
          this.message = "Product successfully edited";
        })
        .catch(error =>{
          this.message = "An error has occurred!";
        })
    }

  }

}

