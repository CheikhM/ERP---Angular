import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../services/sales.service';
import {Order} from '../../models/order.model';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  filteredOrders: any;

  metaDefinition = [
    {text: 'P.O Num', attribute: 'num', type: 'PLString'},
    {text: 'Ship To', attribute: 'shipTo', type: 'PLString'},
    {text: 'Status', attribute: 'status', type: 'string'},
    {text: 'Date', attribute: 'date', type: 'date'},
  ];

  orders: Order [];
  manageAction = 'Add Order';
  orderTobeManaged: Order;
  private toBeDeletedId: any;

  constructor(private sharedService: SharedService,
              private orderService: OrderService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => this.getAllOrders());

    // search order
    this.sharedService.getSearchText().subscribe(item => {
      this.searchOrder(item.toLocaleLowerCase());
    });
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(
      resp => {
        this.orders = resp;
        this.filteredOrders = resp;
      },
      error => console.log(error),
      () => {
        console.log(this.orders);
      }
    );
  }

// search project by name
  private searchOrder(text: string) {
    if (this.orders) {
      this.filteredOrders = this.orders.filter(
        order => order.shipTo.toLowerCase().includes(text) ||
          order.terms.toLowerCase().includes(text) ||
          order.currency.toLowerCase().includes(text) ||
          order.num.toLowerCase().includes(text) ||
          order.link.toLowerCase().includes(text)
      );
    }
  }

  editOrder(orderID: number) {
    this.manageAction = 'Edit Order';
    this.orderTobeManaged = this.orders.find(item => item.id === orderID);

    $('#newOrder').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteOrder(orderID: number) {
    this.toBeDeletedId = orderID;

    $('#deleteOrderModal').modal('show');
  }

  confirmOrderDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.orderService.deleteOrder(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.orders = this.orders.filter(order => order.id !== this.toBeDeletedId);
          this.filteredOrders = this.orders;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteOrderModal').modal('hide');
    }
  }
}
