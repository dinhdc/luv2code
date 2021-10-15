import { Category } from '../../model/Category';
import * as categoryAction from './category.action';
import { CategoryState } from './category.state';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  loaded: false,
  error: false,
};

export function categoryReducer(
  state: CategoryState = initialState,
  action: categoryAction.CategoryAction
) {
    switch (action.type) {
        case categoryAction.GET_CATEGORY_LIST:
            return {...state, loading: true, error: true}
        case categoryAction.GET_CATEGORY_LIST_SUCCESS:
            return {...state, loading: false, loaded: true, categories: action.categories, error: false}
        case categoryAction.GET_CATEGORY_LIST_FAILURE:
            return {...state, loading: false, loaded: true, error: true}
        default:
            return {...state}
    }
}
