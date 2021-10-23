import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { CartItem } from "src/app/common/cart-item.class";
import { Product } from "src/app/common/product.interface";
import { BackendService } from "src/app/services/backend.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-detail",
  template: `<div class="detail-section">
    <div class="container-fluid" style="text-align: left">
      <img src="{{ (product$ | async)?.imageUrl }}" class="detail-image" />

      <h3>{{ (product$ | async)?.name }}</h3>
      <div class="price">{{ (product$ | async)?.unitPrice }}$</div>
      <button (click)="addToCart()" class="btn btn-primary btn-sm">
        Add to cart
      </button>

      <hr />
      <h4>Description</h4>
      <p>{{ (product$ | async)?.description }}</p>

      <a routerLink="/" class="btn btn-warning mt-5">Back to Product List</a>
    </div>
  </div>`
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product> ;
  constructor(
    private service: BackendService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id") as string;
    this.product$ = this.service.getProductById(+id);
  }
  addToCart() {
    this.product$.subscribe((p) => this.cartService.addToCart(new CartItem(p)));
  }
}
