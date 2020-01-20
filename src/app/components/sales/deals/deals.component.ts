import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Client Name', attribute: 'clientName'},
    {text: 'Value', attribute: 'value', type: 'string'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];

  filteredDeals: any;

  constructor() { }

  ngOnInit() {
  }

  editDeal($event: any) {

  }

  deleteDeal($event: any) {

  }
}
