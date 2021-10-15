import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.state';

export const selectCategoryState =
  createFeatureSelector<CategoryState>('feature_category');

export const selectCategoryList = createSelector(
  selectCategoryState,
  (state) => state.categories
);

export const selectStatusCategory = createSelector(
  selectCategoryState,
  (state) => state.loaded
);
