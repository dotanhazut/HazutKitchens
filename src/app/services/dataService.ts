// src/app/services/dataService.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Products} from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';
  public static isAdmin = new BehaviorSubject<boolean>(false);
  public static isLogged = new BehaviorSubject<boolean>(false);
  public static email = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<Products[]> {
    let x = this.http.get<Products[]>(`${this.apiUrl}/products`);
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
    return this.http.post<any>(`${this.apiUrl}/customers`, customer);
  }

  submitPurchase(payload: { email: string, productIds: number[] }) {
    return this.http.post(`${this.apiUrl}/submit-purchase`, payload);
  }

  login(username: string | undefined, email: string | undefined) {
    return  this.http.post<any>(`${this.apiUrl}/login`, {username, email});
  }
}
