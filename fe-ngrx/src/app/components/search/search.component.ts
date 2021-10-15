import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  onSearch(f: NgForm): void {
    let p = f.value.search as string;
    this.route.navigate(['search/' + p]);
  }
}
