import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../../services/order.service';
import {Purchase} from '../../../models/purchase.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-purchase-items',
  templateUrl: './purchase-items.component.html',
  styleUrls: ['./purchase-items.component.css']
})
export class PurchaseItemsComponent implements OnInit {
  currentOrderID: number;
  items: Purchase [];

  constructor(private  sharedService: SharedService,
              private  orderService: OrderService,
              private route: ActivatedRoute,
              private toastService: ToastrService) {
    // get the current order id
    this.currentOrderID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current order id
    this.sharedService.setworkflowID(this.currentOrderID);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/orders/order/');
    this.getAllItems();
  }

  addNewOrderItem() {
    $('#newPurchase').modal('show');
  }

  alertMessage(driverNotSupported: string) {
    this.toastService.error('Driver not installed');
  }

  private getAllItems() {
    this.orderService.getAllItems(this.currentOrderID).subscribe(
      result => {
        this.items = result;
      },
      error => {
      },
      () => {
      }
    );
  }

  triggerBoqAction(item: Purchase) {
    
  }
}
