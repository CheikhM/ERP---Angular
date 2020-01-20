import {Component, OnInit} from '@angular/core';
import {SalesService} from '../../../services/sales.service';

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
  deals: any;

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {

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

  editDeal($event: any) {

  }

  deleteDeal($event: any) {

  }
}
