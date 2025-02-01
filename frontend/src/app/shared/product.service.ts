import { Injectable } from '@angular/core';
// I changed here. Compare it with your to see the difference
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; // Backend URL

   constructor(private http: HttpClient) {}
   
// I changed here. Compare it with your to see the difference
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Get the token from local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // // Get product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Add a product
  addProduct(product: Product): Observable<Product> {
    // I changed here. Compare it with your to see the difference
    return this.http.post<Product>(this.baseUrl, product, { headers: this.getHeaders() });
  }

  // Update a product
  // updateProduct(productId: string, product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  // }

  // Delete a product
  // deleteProduct(productId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  // }

}
