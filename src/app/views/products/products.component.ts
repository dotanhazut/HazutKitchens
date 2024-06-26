import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductsService} from "../../products.service";
import {HttpClientModule} from "@angular/common/http";
import {Products} from "../../models/products";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  standalone: true,
  imports:[CommonModule,HttpClientModule],
  styleUrls: ['./products.css'],
  providers: [ProductsService]
})
export class ProductsComponent {
  products:Observable<any> [] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log('Products data:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error getting products', err);
      }
    });
  }
}
