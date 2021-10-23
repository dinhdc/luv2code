import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-status",
  template: `<div class="cart-area d-n">
    <a routerLink="/cart-detail">
      <div class="total">
        {{ totalPrice | currency }}
        <span>{{ totalQuantity }}</span>
      </div>
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </a>
  </div>`
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantity = 0;
  constructor(private cart: CartService) {}

  ngOnInit() {
    this.cart.totalPrice.subscribe(
      (price) => (this.totalPrice = +price.toFixed(2))
    );
    this.cart.totalQuantity.subscribe(
      (quantity) => (this.totalQuantity = quantity)
    );
  }
}
