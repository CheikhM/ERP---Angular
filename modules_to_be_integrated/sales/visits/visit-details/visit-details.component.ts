import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../../../services/sales.service';
import {AuthService} from '../../../../services/auth.service';
import {Visit} from '../../../../models/visit.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit, OnDestroy {

  readonly currentVisitId: number;
  visit: Visit;
  managerName: string;

  constructor(private sharedService: SharedService,
              private route: ActivatedRoute,
              private saleService: SalesService,
              private authService: AuthService) {
    // get the current visit id
    this.currentVisitId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current visit id
    this.sharedService.setworkflowID(this.currentVisitId);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/visit/');

    this.getCurrentVisit();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentVisit();
      }
    });
  }

  private getCurrentVisit(remote = null) {
    // if no current visit was found
    // todo replace true with "remote"
    if (true) {
      this.saleService.getVisitByID(this.currentVisitId).subscribe(
        result => {
          if (result && result.status === '200_OK') {
            this.visit = new Visit(result.data);
            this.getManagerName(this.visit.manager);
          }
        }
      );

      return true;
    }
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


  triggerVisitEdit() {
    $('#newVisit').modal({
      backdrop: 'static',
      keyboard: false
    });
  }


  ngOnDestroy(): void {
  }

  confirmVisitDelete($event: any) {

  }
}
