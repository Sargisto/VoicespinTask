import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;     
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // in future we can put in .env file

  constructor(private http: HttpClient) {}
   
  getProducts(options?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Observable<{ products: Product[]; total: number }> {
    let params = new HttpParams();

    if (options) {
      if (options.search) params = params.set('search', options.search);
      if (options.category) params = params.set('category', options.category);
      if (options.minPrice) params = params.set('minPrice', options.minPrice.toString());
      if (options.maxPrice) params = params.set('maxPrice', options.maxPrice.toString());
      if (options.sortBy) params = params.set('sortBy', options.sortBy);
      if (options.page) params = params.set('page', options.page.toString());
      if (options.limit) params = params.set('limit', options.limit.toString());
    }

    return this.http.get<{ products: Product[]; total: number }>(this.apiUrl, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
