import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/model/CartItem';
import { Product } from 'src/app/core/model/Product';
import { CartService } from 'src/app/core/service/cart.service';
import { AppState } from 'src/app/core/store/app.state';
import { getProducts } from 'src/app/core/store/product/product.action';
import * as fromProduct from 'src/app/core/store/product/product.selector';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private cartService: CartService) {}
  searchMode: boolean = false;
  products: Product[] = [];
  page = 1;
  count = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 40];
  ngOnInit(): void {
    this.store.dispatch(getProducts());
    this.route.paramMap.subscribe(() => this.listProduct());
  }

  listProduct() {
    const key = this.route.snapshot.paramMap.has('key');
    this.searchMode = key;
    if (!this.searchMode) {
      this.handleListProduct();
    } else {
      this.handleSearchProduct();
    }
  }

  handleListProduct() {
    const hasId = this.route.snapshot.paramMap.has('id');
    if (hasId) {
      const id = +(this.route.snapshot.paramMap.get('id') as string);
      this.store
        .select(fromProduct.selectProductByCategory(id))
        .subscribe((product) => {
          this.products = product as Product[];
          this.count = this.products.length;
        });
    } else {
      this.store.select(fromProduct.selectAllProduct).subscribe((product) => {
        this.products = product;
        this.count = product.length;
      });
    }
  }

  handleSearchProduct() {
    const key = this.route.snapshot.paramMap.get('key') as string;
    this.store
      .select(fromProduct.searchProductByKey(key))
      .subscribe((products) => {
        this.products = products as Product[];
        this.count = this.products.length;
      });
  }

  getResult(): boolean {
    let p: boolean = false;
    this.store.select(fromProduct.selectStatus).subscribe((data) => {
      p = data;
    });
    return p;
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.listProduct();
  }

  onPageChange(event: any) {
    this.page = event;
    this.listProduct();
  }

  addToCart(product: Product){
    this.cartService.addToCart(new CartItem(product));
  }
}
