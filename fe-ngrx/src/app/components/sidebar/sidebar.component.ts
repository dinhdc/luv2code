import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/model/Category';
import { AppState } from 'src/app/core/store/app.state';
import { getCategoryList } from 'src/app/core/store/category/category.action';
import {
  selectCategoryList,
  selectStatusCategory,
} from 'src/app/core/store/category/category.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  categories$!: Observable<Category[]>;
  ngOnInit(): void {
    this.store.dispatch(getCategoryList());
    this.store
      .select(selectStatusCategory)
      .subscribe((status) => this.getCategoryList(status));
  }

  getCategoryList(status: boolean) {
    if (status) {
      this.categories$ = this.store.select(selectCategoryList);
    }
  }
}
