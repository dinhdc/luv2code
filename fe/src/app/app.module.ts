import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CartDetailComponent} from './components/cart-detail/cart-detail.component';
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {SearchComponent} from './components/search/search.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SidebarComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailComponent,
    CheckoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
