import {Product} from "./product.interface";

export class CartItem {
  id: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(p: Product) {
    this.id = p.id + "";
    this.name = p.name;
    this.imageUrl = p.imageUrl;
    this.unitPrice = p.unitPrice;
    this.quantity = 1;
  }
}
