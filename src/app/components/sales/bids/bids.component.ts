import {Component, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../services/sales.service';
import {Bid} from '../../../models/bid.model';
import {SharedService} from '../../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {Project} from '../../../models/project.model';

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
  manageAction = 'Add Bid';
  bidTobeManaged: any;
  private toBeDeletedId: any;

  constructor(private salesService: SalesService,
              private sharedService: SharedService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/bid/');

    this.getAllBids();

    // search bid
    this.sharedService.getSearchText().subscribe(item => {
      this.searchBid(item.toLocaleLowerCase());
    });

    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllBids();
      }
    });
  }

  // get all projects
  getAllBids() {
    this.salesService.getAllBids().subscribe(
      resp => {
        //console.log(resp);
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
    //console.log(this.bids);
    if (this.bids) {
      this.filteredBids = this.bids.filter(bid => bid.name.toLowerCase().includes(text));
    }
  }

  editBid(bidID: number) {
    this.manageAction = 'Edit Bid';
    this.bidTobeManaged = this.bids.find(item => item.id === bidID);

    $('#newBid').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteBid(bidID: number) {
    this.toBeDeletedId = bidID;

    $('#deleteBidModal').modal('show');
  }

  confirmBidDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.salesService.deleteBid(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.bids = this.bids.filter(bid => bid.id !== this.toBeDeletedId);
          this.filteredBids = this.bids.filter(bid => bid.id !== this.toBeDeletedId);
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteBidModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Bid';
    this.bidTobeManaged = Bid.getEmptyBid();
  }
}
