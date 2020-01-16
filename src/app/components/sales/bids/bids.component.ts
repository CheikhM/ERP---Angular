import {Component, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../services/sales.service';

declare var $: any;
@AutoUnsubscribe()
@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Client Name', attribute: 'clientName', type: 'date'},
    {text: 'Submission Date', attribute: 'submissionDate', type: 'date'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];

  filteredBids: any;
  private bids: Bid[];

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {
    this.getAllBids();
  }

  // get all projects
  getAllBids() {
    this.salesService.getAllBids().subscribe(
      resp => {
        this.bids = resp;
        this.filteredBids = resp;
      },
      error => // console.log(error),
        () => {
        }
    );
  }

  editProject($event: any) {

  }

  deleteProject($event: any) {

  }

  confirmBidDelete($event: any) {

  }
}
