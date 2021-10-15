import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../core/store/app.state";
import {getProducts} from "../core/store/product/product.action";
import {searchProductByKey, selectProductByCategory} from "../core/store/product/product.selector";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getProducts());
  }

  loading(id: string, key: string): void{
    if(id != ""){
      this.store.select(selectProductByCategory(+id)).subscribe(data => console.log(data));
    }
    if(key != ""){
      this.store.select(searchProductByKey(key)).subscribe(data=>console.log(data));
    }
  }

}
