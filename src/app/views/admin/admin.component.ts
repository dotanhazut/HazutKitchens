// src/app/views/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../../services/dataService";
import { Products } from "../../models/products";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DataService]
})
export class AdminComponent implements OnInit {
  newProduct: { price: number; name: string; description: string; title: string } = {name:'', title: '',price :0,description:''};
  products: Products[] = [];
  isAdmin: boolean = DataService.isAdmin.getValue();
  constructor(protected dataService: DataService) { }

  ngOnInit() {
    console.log(this.isAdmin);
    this.loadProducts();
  }

  loadProducts() {
    this.dataService.getProductList().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products data:', data);
      },
      error: (err) => {
        console.error('Error getting products', err);
      }
    });
  }

  addProduct() {
    this.dataService.addProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.newProduct = { name: '', title: '', price: 0, description: '' };
        console.log('Product added:', product);
      },
      error: (err) => console.error('Error adding product', err)
    });
  }

  removeProduct(productId: number) {
    this.dataService.removeProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== productId);
        console.log('Product removed');
      },
      error: (err) => console.error('Error removing product', err)
    });
  }

  protected readonly DataService = DataService;
}
