import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  template: ` <form class="form-header" #f="ngForm">
    <input
      class="au-input au-input-xl"
      ngModel
      type="text"
      name="search"
      placeholder="Search for data ..."
      (keypress.enter)="searchProduct(f)"
      autocomplete="off"
    />
    <button class="au-btn-submit" (click)="searchProduct(f)">
      Search
    </button>
  </form>`
})
export class SearchComponent {
  constructor(private route: Router) {}
  searchProduct(f: NgForm) {
    let p = f.value.search;
    if (p) {
      this.route.navigateByUrl("/search/" + p);
    }
    f.resetForm();
  }
}
