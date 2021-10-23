import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/common/cart-item.class";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html"
})
export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.updateBill();
  }

  incrementQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: CartItem): void {
    this.cartService.decrementQuantity(item);
  }

  removeCartItem(item: CartItem): void {
    this.cartService.remove(item);
  }
}
