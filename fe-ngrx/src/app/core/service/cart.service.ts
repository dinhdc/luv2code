import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../model/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if item already exists in cartItems
    let alreadyExistsInCart: boolean = false;
    let exsistingCartItem!: CartItem;

    if (this.cartItems.length > 0) {
      // find the item in cart base on item id
      for (let temp of this.cartItems) {
        if (temp.id === cartItem.id) {
          exsistingCartItem = temp;
          break;
        }
      }
    }
    // check if cartItem
    alreadyExistsInCart = exsistingCartItem != undefined;

    if (alreadyExistsInCart) {
      exsistingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.logCartData(totalPrice, totalQuantity);
  }
  logCartData(totalPrice: number, totalQuantity: number) {
    console.log('Contents of carts');
    for (let item of this.cartItems) {
      const subTotalPrice = item.unitPrice * item.quantity;
      console.log(
        `name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice},subTotalPrice: ${subTotalPrice}, `
      );
    }

    console.log(
      `totalPrice: ${totalPrice.toFixed(2)} , totalQuantity: ${totalQuantity}`
    );
    console.log('-------------');
  }
}
