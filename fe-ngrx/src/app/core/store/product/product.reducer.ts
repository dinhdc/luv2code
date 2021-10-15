import {adapter, ProductState} from "./product.state";
import * as ProductActions from "./product.action";

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  loaded: false,
  error: ''
});

export function productReducer(
  state: ProductState = initialState,
  action: ProductActions.productAction
) {
  switch (action.type) {
    case ProductActions.GET_PRODUCTS:
      return {...state, loading: true, loaded: false}
    case ProductActions.GET_PRODUCTS_SUCCESS:
      return adapter.setAll(action.products, {...state, loaded: true, loading: false})
    case ProductActions.GET_PRODUCTS_FAILURE:
      return {...state, loading: false, loaded: true, error: action.error}
    default:
      return state
  }
}

// selector
export const getProductId = (state: ProductState) => state.selectedProductId;
const {selectIds, selectEntities, selectAll} = adapter.getSelectors();
export const selectProductIds = selectIds;
export const selectProductEntities = selectEntities;
export const selectAllProducts = selectAll;


