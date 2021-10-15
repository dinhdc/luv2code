import { Product } from './Product';
export class CartItem {
  id: String;
  name: String;
  imageUrl: String;
  unitPrice: number;
  quantity: number;

  constructor(p: Product) {
    this.id = p.id + '';
    this.name = p.name;
    this.imageUrl = p.imageUrl;
    this.unitPrice = p.unitPrice;
    this.quantity = 1;
  }
}
