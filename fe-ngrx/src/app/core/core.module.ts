import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product/product.effect';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/product/product.reducer';
import { categoryReducer } from './store/category/category.reducer';
import { CategoryEffects } from './store/category/category.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('feature_product', productReducer),
    StoreModule.forFeature('feature_category', categoryReducer),
    EffectsModule.forFeature([ProductEffects, CategoryEffects]),
  ],
})
export class CoreModule {}
