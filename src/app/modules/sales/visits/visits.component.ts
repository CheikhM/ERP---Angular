import {Component, OnInit} from '@angular/core';
import {SalesService} from '../../../services/sales.service';
import {SharedService} from '../../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {Deal} from '../../../models/deal.model';
import {Visit} from '../../../models/visit.model';

declare var $: any;

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  filteredVisits: any;

  metaDefinition = [
    {text: 'Client', attribute: 'clientName', type: 'PLString'},
    {text: 'Date', attribute: 'date', type: 'date'},
    {text: 'reason', attribute: 'reason', type: 'string'},
    {text: 'contact', attribute: 'contact', type: 'string'},
  ];

  visits: any;
  manageAction = 'Add Visit';
  visitTobeManaged: any;
  private toBeDeletedId: any;

  constructor(private salesService: SalesService,
              private sharedService: SharedService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllVisits();
      }
    });

    // search visit
    this.sharedService.getSearchText().subscribe(item => {
      this.searchVisit(item.toLocaleLowerCase());
    });
    this.getAllVisits();
  }

  getAllVisits() {
    this.salesService.getAllVisits().subscribe(
      resp => {
        // console.log(resp);
        this.visits = resp;
        this.filteredVisits = resp;
      },
      error => // console.log(error),
        () => {
        }
    );
  }

  // search project by name
  private searchVisit(text: string) {
    if (this.visits) {
      this.filteredVisits = this.visits.filter(visit => visit.name.toLowerCase().includes(text));
    }
  }

  editVisit(visitID: number) {
    this.manageAction = 'Edit Visit';
    this.visitTobeManaged = this.visits.find(item => item.id === visitID);

    $('#newVisit').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteVisit(visitID: number) {
    this.toBeDeletedId = visitID;

    $('#deleteVisitModal').modal('show');
  }

  confirmVisitDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.salesService.deleteVisit(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.visits = this.visits.filter(visit => visit.id !== this.toBeDeletedId);
          this.filteredVisits = this.visits;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteVisitModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Visit';
    this.visitTobeManaged = Visit.getEmptyVisit();
  }
}
