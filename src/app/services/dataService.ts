import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Products[]> {
    let x = this.http.get<Products[]>('http://localhost:3000/products');
    console.log(x);
    return x;
  }
}
