import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../../services/sales.service';
import {AuthService} from '../../../../services/auth.service';
import {Deal} from '../../../../models/deal.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.css']
})
export class DealDetailsComponent implements OnInit, OnDestroy {

  readonly currentDealId: number;
  deal: Deal;
  managerName: string;

  constructor(private sharedService: SharedService,
              private route: ActivatedRoute,
              private saleService: SalesService,
              private authService: AuthService) {
    // get the current project id
    this.currentDealId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentDealId);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/deal/');

    this.getCurrentDeal();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => this.getCurrentDeal(true));
  }

  private getCurrentDeal(remote = null) {
    // if no current project was found
    // todo replace true with "remote"
    if (true) {
      this.saleService.getDealByID(this.currentDealId).subscribe(
        result => {
          if (result && result.status === '200_OK') {
            this.deal = new Deal(result.data);
            this.getManagerName(this.deal.manager);
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


  triggerDealEdit() {
    $('#newDeal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }


  ngOnDestroy(): void {
  }

  confirmDealDelete($event: any) {

  }
}
