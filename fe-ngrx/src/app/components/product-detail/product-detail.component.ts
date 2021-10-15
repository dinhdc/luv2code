import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/Product';
import { AppState } from 'src/app/core/store/app.state';
import { getProducts } from 'src/app/core/store/product/product.action';
import {
  searchProductById,
  selectStatus,
} from 'src/app/core/store/product/product.selector';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>;
  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id') as string;
    let loaded = false;
    this.store.select(selectStatus).subscribe((data) => (loaded = data));
    if (!loaded) {
      this.store.dispatch(getProducts());
    }
    this.loadProduct(id);
  }

  loadProduct(id: string) {
    this.product$ = this.store.select(searchProductById(id));
  }
}
