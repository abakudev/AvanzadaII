import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/category,model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  filters: Array<ProductCategory>;

  ngOnInit(): void {
  }

  getFilters(filters : Array<ProductCategory>) {
    this.filters = filters;
  }
}
