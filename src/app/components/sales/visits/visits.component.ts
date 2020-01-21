import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  filteredVisits: any;

  metaDefinition = [
    {text: 'Client', attribute: 'name', type: 'PLString'},
    {text: 'Date', attribute: 'clientName'},
    {text: 'Value', attribute: 'value', type: 'string'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];
  visitTobeManaged: any;
  manageAction: any;

  constructor() {
  }

  ngOnInit() {
  }

  deleteVisit($event: any) {

  }

  editVisit($event: any) {

  }

  confirmVisitDelete($event: any) {
    
  }
}
