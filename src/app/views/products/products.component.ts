import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../products.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  standalone: true,
  imports:[CommonModule,HttpClientModule],
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit{
  products:any [] = [];

  constructor(private productsService:ProductsService)  {
  }
  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.error('Error getting products.components.ts',err);
      }
    });
  }
}
