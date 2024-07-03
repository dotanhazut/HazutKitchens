import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlCustomers = 'http://localhost:3000/customers';
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Products[]> {
    let x = this.http.get<Products[]>('http://localhost:3000/products');
    console.log(x);
    return x;
  }

  addProduct(product: { price: number; name: string; description: string; title: string }): Observable<Products> {
    return this.http.post<Products>(`${this.apiUrl}/products`, product);
  }

  removeProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCustomers, customer);
  }
  submitPurchase(payload: { customerId: number, productIds: number[] }) {
    return this.http.post(`${this.apiUrl}/submit-purchase`, payload);
  }


}
