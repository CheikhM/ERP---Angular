import {Component, OnInit} from '@angular/core';
import {SalesService} from '../../../services/sales.service';
import {SharedService} from '../../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {Deal} from '../../../models/deal.model';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

declare var $: any;


@AutoUnsubscribe()
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Client Name', attribute: 'clientName'},
    {text: 'Value', attribute: 'value', type: 'string'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];

  filteredDeals: any;
  deals: any;
  manageAction = 'Add Deal';
  dealTobeManaged: any;
  private toBeDeletedId: any;

  constructor(private salesService: SalesService,
              private sharedService: SharedService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        console.log('get deals');
        this.getAllDeals();
      }
    });

    // search deal
    this.sharedService.getSearchText().subscribe(item => {
      this.searchDeal(item.toLocaleLowerCase());
    });
    this.getAllDeals();
  }

  getAllDeals() {
    this.salesService.getAllDeals().subscribe(
      resp => {
        // console.log(resp);
        this.deals = resp;
        this.filteredDeals = resp;
      },
      error => // console.log(error),
        () => {
        }
    );
  }

  // search project by name
  private searchDeal(text: string) {
    if (this.deals) {
      this.filteredDeals = this.deals.filter(deal => deal.name.toLowerCase().includes(text));
    }
  }

  editDeal(dealID: number) {
    this.manageAction = 'Edit Deal';
    this.dealTobeManaged = this.deals.find(item => item.id === dealID);

    $('#newDeal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteDeal(dealID: number) {
    this.toBeDeletedId = dealID;

    $('#deleteDealModal').modal('show');
  }

  confirmDealDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.salesService.deleteDeal(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.deals = this.deals.filter(deal => deal.id !== this.toBeDeletedId);
          this.filteredDeals = this.deals;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteDealModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Deal';
    this.dealTobeManaged = Deal.getEmptyDeal();
  }
}
