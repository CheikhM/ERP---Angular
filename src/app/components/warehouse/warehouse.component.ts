import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {OrderService} from '../../services/order.service';
import {User} from '../../models/user.model';
import {Purchase} from '../../models/purchase.model';
import {TasksService} from '../../services/tasks.service';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  itemToBeManaged: Purchase;

  filteredWItems: Purchase[];

  metaDefinition = [
    {text: 'Part No', attribute: 'partCode', type: 'PLString'},
    {text: 'Project Code', attribute: 'projectID'},
    {text: 'Status', attribute: 'status', type: 'string'},
    {text: 'Received Date', attribute: 'receivedDate', type: 'date'},
  ];

  WItems: Purchase [];
  manageAction = 'Add Item';
  WItemTobeManaged: Purchase;
  private toBeDeletedId: number;
  constructor(private sharedService: SharedService,
              private orderService: OrderService,
              private toastrService: ToastrService) {
  }
  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => this.getAllWItems());

    // search WItem
    this.sharedService.getSearchText().subscribe(item => {
      this.searchWItem(item.toLocaleLowerCase());
    });
    this.getAllWItems();
  }

  getAllWItems() {
    this.orderService.getAllItems(0, 1).subscribe(
      resp => {
        //console.log(resp);
        this.WItems = resp;
        this.filteredWItems = resp;
      },
      error => {},
      () => {
        //console.log(this.WItems);
      }
    );
  }

// search project by name
  private searchWItem(text: string) {
    if (this.WItems) {
      this.filteredWItems = this.WItems.filter(WItem => WItem.description.toLowerCase().includes(text));
    }
  }

  editWItem(WItemID: number) {
    this.manageAction = 'Edit WItem';
    this.WItemTobeManaged = this.WItems.find(item => item.id === WItemID);

    $('#newWItem').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteWItem(WItemID: number) {
    this.toBeDeletedId = WItemID;

    $('#deleteWItemModal').modal('show');
  }

  /*
  confirmWItemDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.orderService.(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.WItems = this.WItems.filter(WItem => WItem.id !== this.toBeDeletedId);
          this.filteredWItems = this.WItems;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteWItemModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add WItem';
    this.WItemTobeManaged = WItem.getEmptyWItem();
  }


   */
}
