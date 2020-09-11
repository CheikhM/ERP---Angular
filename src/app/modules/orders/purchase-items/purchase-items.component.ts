import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../../services/order.service';
import {Purchase} from '../../../models/purchase.model';
import {Order} from '../../../models/order.model';
import {siteUrl} from '../../../config';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-purchase-items',
  templateUrl: './purchase-items.component.html',
  styleUrls: ['./purchase-items.component.scss']
})
export class PurchaseItemsComponent implements OnInit {
  currentOrderID: number;
  items: Purchase [];
  manageAction = 'Add Item';
  itemToBeManaged: Purchase;
  orderDiscount: any;
  orderVat: any;
  total: any;
  sumItemsValue: any;
  private order: Order;
  p: number;
  projectCode: string;
  orderPath: string = siteUrl + 'files/pdf/document.pdf?id=';

  constructor(private  sharedService: SharedService,
              private  orderService: OrderService,
              private route: ActivatedRoute,
              private toastService: ToastrService,
              private projectService: ProjectService) {
    // get the current order id
    this.currentOrderID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current order id
    this.sharedService.setworkflowID(this.currentOrderID);
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllItems();
      }
    });
    this.sharedService.setCurrentWorkflowPath('/orders/order/');
    this.getAllItems();
  }

  addNewOrderItem() {
    $('#newPurchase').modal('show');
  }

  alertMessage(msg: string) {
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
        this.getCurrentOrder(this.currentOrderID);
      }
    );
  }


  triggerPurchaseItemAction(itemID: number) {
    this.manageAction = 'Edit Item';
    this.itemToBeManaged = this.items.find(item => item.id === itemID);

    $('#newPurchase').modal({
      backdrop: 'static',
      keyboard: false
    });

  }


  getCurrentOrder(id: number): void {
    if (!id) {
      return;
    }
    this.orderService.getOrderByID(id).subscribe(
      result => {
        if (result && result.status === '200_OK') {
          this.order = new Order(result.data);
        } else {
          return;
        }
      },
      error => {
        return;
      },
      () => {
        this.orderDiscount = parseFloat(this.order.discount);
        this.getOrderStatistics(this.currentOrderID);
      }
    );
  }

  clearPopup() {
    this.itemToBeManaged = Purchase.getEmptyPurchase(false);
    this.manageAction = 'Add Item';
  }

  private getOrderStatistics(currentOrderID: number) {
    this.sumItemsValue = this.items.map(item => (item.rate * item.quantity)).reduce((prev, next) => prev + next, 0);
    this.orderVat = this.order.vatValue ? (this.sumItemsValue * this.order.vatValue) / 100 : 0;
    this.total = this.sumItemsValue - this.orderVat - this.orderDiscount;
  }

  changeStatus(item: Purchase) {
    const copy = {
      id: item.id,
      received: item.received ? 1 : 0,
      status: item.received ? 'Check In' : 'Initial',
    };
    $('#item_' + item.id).parent('.__styled-checkbox').css('pointer-events', 'none');

    this.orderService.updatePurchase(copy).subscribe(
      result => {
        if (result && result['status'] === '200_OK' && result['data'].pid) {
          this.toastService.success('Successfully updated');
        } else {
          this.toastService.error('Error: X02222222V');
        }
      }, error => {
        this.toastService.error('Error: X02222222V');
        $('#item_' + item.id).parent('.__styled-checkbox').css('pointer-events', 'initial');
      },
      () => {
        $('#item_' + item.id).parent('.__styled-checkbox').css('pointer-events', 'initial');
      });
  }

  getProjectCode(projectID: number) {
    if (projectID) {
      this.projectService.getProjectByID(projectID).subscribe(result => {
        if (result && result['status'] === '200_OK') {
          this.projectCode = result['data'].code;
        }
      });
    }
  }

  printOrder() {
    $('#pdfViewer').modal('show');
  }
}
