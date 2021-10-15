import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../service/backend.service';
import * as categoryAction from './category.action';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects {
  constructor(private action$: Actions, private service: BackendService) {}

  loadCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(categoryAction.getCategoryList),
      mergeMap(() => this.service.getCategoryList()),
      map((categories) =>
        categoryAction.getCategoryListSuccess({ categories })
      ),
      catchError(() => of(categoryAction.getCategoryListFailure()))
    )
  );
}
