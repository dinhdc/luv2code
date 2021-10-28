import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Country} from '../common/country.interface';
import {State} from '../common/state.class';

@Injectable({
  providedIn: 'root',
})
export class OrderFormService {
  private countryURL = 'http://localhost:9000/api/countries';
  private stateURL = 'http://localhost:9000/api/states';

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryURL);
  }

  getStatus(code: string): Observable<State[]> {
    const url = `${this.stateURL}?code=${code}`;
    return this.http.get<State[]>(url);
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    for (let index = startYear; index <= endYear; index++) {
      data.push(index);
    }
    return of(data);
  }
}

