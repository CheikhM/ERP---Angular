import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-purchase-items',
  templateUrl: './purchase-items.component.html',
  styleUrls: ['./purchase-items.component.css']
})
export class PurchaseItemsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  addNewOrderItem() {
    $('#newPurchase').modal('show');
  }

}
