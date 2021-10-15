import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { ProductState } from './product.state';
import * as reducer from './product.reducer';
import { Dictionary } from '@ngrx/entity';
import { Product } from '../../model/Product';

export const selectProductState =
  createFeatureSelector<ProductState>('feature_product');

export const selectProductIds = createSelector(
  selectProductState,
  reducer.selectProductIds
);

export const selectProductEntities = createSelector(
  selectProductState,
  reducer.selectProductEntities
);

export const selectAllProduct = createSelector(
  selectProductState,
  reducer.selectAllProducts
);

export const selectCurrentProductId = createSelector(
  selectProductState,
  reducer.getProductId
);

export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectCurrentProductId,
  (entities, pId) => entities[pId + '']
);

export const selectProductByCategory = (cId: Number) =>
  createSelector(selectProductEntities, (products: Dictionary<Product>) => {
    return Object.values(products).filter(
      (product) => product?.category === cId
    );
  });

export const searchProductByKey = (key: string) =>
  createSelector(selectProductEntities, (products: Dictionary<Product>) => {
    return Object.values(products).filter(
      (product) => product?.name.toLowerCase()?.indexOf(key.toLowerCase()) != -1
    );
  });
export const searchProductById = (id: string) =>
  createSelector(selectAllProduct, (products) => {
    return products.find((product) => product?.id === +id) as Product;
  });
export const selectStatus = createSelector(
  selectProductState,
  (state) => state.loaded
);
