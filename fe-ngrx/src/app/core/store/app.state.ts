import { ActionReducerMap } from '@ngrx/store';
import { categoryReducer } from './category/category.reducer';
import { CategoryState } from './category/category.state';
import { productReducer } from './product/product.reducer';
import { ProductState } from './product/product.state';

export interface AppState {
  products: ProductState;
  categories: CategoryState;
}
