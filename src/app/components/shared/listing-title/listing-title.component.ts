import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing-title',
  templateUrl: './listing-title.component.html',
  styleUrls: ['./listing-title.component.css']
})
export class ListingTitleComponent implements OnInit {

  @Input()
  data: any;
  constructor() { }

  ngOnInit() {
  }

}
