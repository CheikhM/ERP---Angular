import {Component, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../services/sales.service';
import {Bid} from '../../../models/bid.model';
import {SharedService} from '../../../services/shared.service';

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
    {text: 'Client Name', attribute: 'clientName'},
    {text: 'Submission Date', attribute: 'submissionDate', type: 'date'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];

  filteredBids: Bid[];
  bids: Bid[];

  constructor(private salesService: SalesService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/bid/');

    this.getAllBids();

    // search project
    this.sharedService.getSearchText().subscribe(item => {
      this.searchBid(item.toLocaleLowerCase());
    });
  }

  // get all projects
  getAllBids() {
    this.salesService.getAllBids().subscribe(
      resp => {
        console.log(resp);
        this.bids = resp;
        this.filteredBids = resp;
      },
      error => // console.log(error),
        () => {
        }
    );
  }

  // search project by name
  private searchBid(text: string) {
    console.log(this.bids);
    if (this.bids) {
      this.filteredBids = this.bids.filter(bid => bid.name.toLowerCase().includes(text));
    }
  }

  editProject($event: any) {

  }

  deleteProject($event: any) {

  }

  confirmBidDelete($event: any) {

  }
}
