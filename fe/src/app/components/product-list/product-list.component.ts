import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "src/app/common/cart-item.class";
import { CartService } from "src/app/services/cart.service";
import { Product } from "../../common/product.interface";
import { BackendService } from "../../services/backend.service";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  page = 1;
  count = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 40];

  constructor(
    private route: ActivatedRoute,
    private service: BackendService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProduct());
  }

  listProduct(): void {
    const searchMode: boolean = this.route.snapshot.paramMap.has("key");
    if (!searchMode) {
      this.handleListProduct();
    } else {
      this.handleSearchProduct();
    }
  }

  handleListProduct(): void {
    const hasId: boolean = this.route.snapshot.paramMap.has("id");
    if (!hasId) {
      this.service
        .getProductList()
        .subscribe((products) => (this.products = products));
    } else {
      const id = this.route.snapshot.paramMap.get("id") as string;
      this.service
        .getProductByCategory(id)
        .subscribe((products) => (this.products = products));
    }
  }

  handleSearchProduct(): void {
    const key = this.route.snapshot.paramMap.get("key");
    this.service
      .getProductByKey(key as string)
      .subscribe((data) => (this.products = data));
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

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
