import { ActionType, createAction, props } from '@ngrx/store';
import { Category } from '../../model/Category';

export const GET_CATEGORY_LIST = '[CATEGORY] Get Category List';
export const GET_CATEGORY_LIST_SUCCESS = '[CATEGORY] Get Category List Success';
export const GET_CATEGORY_LIST_FAILURE = '[CATEGORY] Get Category List Failure';

export const getCategoryList = createAction(GET_CATEGORY_LIST);
export const getCategoryListSuccess = createAction(
  GET_CATEGORY_LIST_SUCCESS,
  props<{ categories: Category[] }>()
);
export const getCategoryListFailure = createAction(GET_CATEGORY_LIST_FAILURE);

export type CategoryAction =
  | ActionType<typeof getCategoryList>
  | ActionType<typeof getCategoryListSuccess>
  | ActionType<typeof getCategoryListFailure>;
