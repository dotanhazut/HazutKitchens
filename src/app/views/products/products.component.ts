import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Products} from "../../models/products";
import {DataService} from "../../services/dataService";

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  standalone: true,
  imports:[CommonModule,HttpClientModule],
  styleUrls: ['./products.css'],
  providers: [DataService]
})
export class ProductsComponent implements OnInit{
  products:Products[] = [];
  constructor(protected productsService: DataService) { }

  ngOnInit() {
    this.productsService.getProductList().subscribe({
      next: (data) => {
        console.log('Products data:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error getting products', err);
      }
    });
  }

  protected readonly console = console;
}
