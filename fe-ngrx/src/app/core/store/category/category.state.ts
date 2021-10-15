import { Category } from '../../model/Category';


export interface CategoryState {
    categories: Category[];
    loading: boolean;
    loaded: boolean;
    error: boolean;
}