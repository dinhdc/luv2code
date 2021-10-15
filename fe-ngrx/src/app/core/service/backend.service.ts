import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/Product";
import {Category} from "../model/Category";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private URL = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.URL}products`);
  }

  getCategoryList(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.URL}categories`);
  }
}
