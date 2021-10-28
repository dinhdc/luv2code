import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product.interface";
import {Category} from "../common/category.interface";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  private URL = "http://localhost:9000/api";

  constructor(private http: HttpClient) {
  }

  // get product list
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`);
  }

  // get category list
  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  // get product detail
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/products/${id}`);
  }

  // get product by category
  getProductByCategory(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products/find?category=${id}`);
  }

  // get product by keyword
  getProductByKey(key: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products/find?keyword=${key}`);
  }
}
