import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Purchase} from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseURL = 'http://localhost:9000/api/checkout/purchase';

  constructor(private http: HttpClient) {
  }

  placeOrder(purchase: Purchase): Observable<any> {
    console.log('call service');
    return this.http.post<Purchase>(this.purchaseURL, purchase);
  }
}
