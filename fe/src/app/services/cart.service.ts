import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item.class";
@Injectable({
  providedIn: "root"
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(item: CartItem): void {
    let isExists: boolean = false;
    let existingItem!: CartItem;
    // check if item exists
    if (this.cartItems.length > 0) {
      existingItem = this.cartItems.find((c) => c.id === item.id) as CartItem;
    }

    isExists = existingItem != null;
    // add to cart
    if (isExists) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(item);
    }
    // subcribe new
    this.updateBill();
  }

  updateBill(): void {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;
    this.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    });
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.logCartData(totalPrice, totalQuantity);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart");
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log("----");
  }

  decrementQuantity(item: CartItem): void {
    item.quantity--;
    if (item.quantity === 0) {
      this.remove(item);
    } else {
      this.updateBill();
    }
  }

  remove(item: CartItem): void {
    const itemIndex = this.cartItems.findIndex((tmp) => tmp.id === item.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.updateBill();
    }
  }
}
