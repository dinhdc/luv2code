import {ActionType, createAction, props} from "@ngrx/store";
import {Product} from "../../model/Product";


export const GET_PRODUCTS = "[PRODUCT] Get Products";
export const GET_PRODUCTS_SUCCESS = "[PRODUCT] Get Products Success";
export const GET_PRODUCTS_FAILURE = "[PRODUCT] Get Products Failure";

export const getProducts = createAction(GET_PRODUCTS);
export const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS, props<{ products: Product[] }>());
export const getProductsFailure = createAction(GET_PRODUCTS_FAILURE, props<{ error: String }>());

export type productAction =
  | ActionType<typeof getProducts>
  | ActionType<typeof getProductsSuccess>
  | ActionType<typeof getProductsFailure>;
