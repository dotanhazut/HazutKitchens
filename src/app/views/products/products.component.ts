import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Products} from "../../models/products";
import {DataService} from "../../services/dataService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./products.css'],
  providers: [DataService]
})
export class ProductsComponent implements OnInit{
  products:Products[] = [];
  totalPrice: number = 0;
  customerId: number = 0 ;
  constructor(protected productsService: DataService) { }

  ngOnInit() {
    this.productsService.getProductList().subscribe({
      next: (data) => {
        // @ts-ignore
        this.products = data.map(product => ({...product, selected: false}));
        this.updateTotal();
        console.log('Products data:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error getting products', err);
      }
    });
  }
  updateTotal() {
    this.totalPrice = this.products
      .filter(product => product.selected)
      .reduce((sum, product) => sum + product.price, 0);
  }
  submitPurchase(event: Event) {
    event.preventDefault();

    const selectedProducts = this.products
      .filter(product => product.selected)
      .map(product => product.id);

    const payload = {
      customerId: this.customerId,
      productIds: selectedProducts
    };

    this.productsService.submitPurchase(payload).subscribe({
      next: (response) => {
        console.log('Purchase successful', response);
      },
      error: (err) => {
        alert("The purchase failed");
        console.error('Error submitting purchase', err);
      }
    });
  }

}
