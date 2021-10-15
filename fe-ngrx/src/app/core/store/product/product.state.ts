import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Product} from "../../model/Product";


export interface ProductState extends EntityState<Product> {
  selectedProductId: Number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export function selectProductId(p: Product): string {
  return p.id + '';
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectProductId
})
