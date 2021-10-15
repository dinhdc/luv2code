import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {BackendService} from "../../service/backend.service";
import * as ProductActions from "./product.action";
@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(
    () => this.actions$.
    pipe(
      ofType(ProductActions.getProducts),
      mergeMap(() => this.service.getProductList()),
      map(products => ProductActions.getProductsSuccess({products})),
      catchError((error) => of(ProductActions.getProductsFailure({error})))
    )
  );
  constructor(
    private actions$: Actions,
    private service: BackendService
  ) {}
}
