import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../../services/sales.service';
import {Bid} from '../../../../models/bid.model';
import {AuthService} from '../../../../services/auth.service';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.scss']
})
export class BidDetailsComponent implements OnInit, OnDestroy {
  readonly currentBidId: number;
  bid: Bid;
  managerName: string;

  constructor(private sharedService: SharedService,
              private route: ActivatedRoute,
              private saleService: SalesService,
              private authService: AuthService) {
    // get the current project id
    this.currentBidId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentBidId);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/bid/');

    this.getCurrentBid();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentBid(true);
      }
    });
  }

  private getCurrentBid(remote = null) {
    // if no current project was found
    // todo replace true with "remote"
    if (true) {
      this.saleService.getBidByID(this.currentBidId).subscribe(
        result => {
          if (result.status === '200_OK') {
            this.bid = new Bid(result.data);
            this.getManagerName(this.bid.manager);
          }
        }
      );

      return true;
    }
    /*
    this.currentProjectSub = this.sharedService.getCurrentListingElement().subscribe(
      project => {
        this.project = project;
        if (!this.project) {
          this.getCurrentProject(true);
        }
      }
    );
     */
  }


  private getManagerName(managerID: number) {
    if (managerID) {
      const sub = this.authService.getUserByID(managerID).subscribe(
        res => {
          if (res && res.data) {
            this.managerName = res.data.name;
          }
        }, error => sub.unsubscribe(), () => sub.unsubscribe());
    }
  }

  confirmBidDelete($event: any) {

  }

  initManageData() {

  }

  triggerBidEdit() {
    $('#newBid').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  ngOnDestroy(): void {
  }

}
