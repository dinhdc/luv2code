import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "src/app/common/category.interface";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-sidebar",
  templateUrl: './sidebar.component.html', 
})
export class SidebarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private service: BackendService, private route: Router) {}

  ngOnInit(): void {
    this.service
      .getCategoryList()
      .subscribe((data) => (this.categories = data));
  }
}
