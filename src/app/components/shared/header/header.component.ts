import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listingPage = true;
  includeSearchBar = true;

  constructor() {
  }

  ngOnInit() {
    this.loadPageHeader();
  }

  // the header is dynamic
  private loadPageHeader() {
    return true;
  }
}
