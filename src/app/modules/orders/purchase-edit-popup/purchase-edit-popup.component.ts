import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Purchase} from '../../../models/purchase.model';
import {OrderService} from '../../../services/order.service';
import {DateHelper} from '../../../helpers/date.helper';
import {ProjectService} from '../../../services/project.service';
import {Order} from '../../../models/order.model';
import { Project } from 'src/app/models/project.model';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-purchase-edit-popup',
  templateUrl: './purchase-edit-popup.component.html',
  styleUrls: ['./purchase-edit-popup.component.scss']
})
export class PurchaseEditPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  orderID: number;

  @Input()
  showOnly = false;

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  purchaseCopy: Purchase;
  projects: any;

  @Input()
  wareHouse = false;

  @Input()
  purchase: any = Purchase.getEmptyPurchase(this.wareHouse);

  orders: Order [];

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.purchaseCopy = Purchase.getEmptyPurchase(this.wareHouse);
    this.getProjects();
    if (this.wareHouse) {
      this.getAllOrders();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.purchase) {
      this.purchaseCopy = {...this.purchase};
    }
  }

  restoreModal() {
    this.onExitModal.emit(true);
  }

  isEmpty(model: NgModel) {
    return this.isNotValid(model) && model.errors.required;
  }

  isNotValid(model: NgModel) {
    return model.invalid && (model.dirty || model.touched);
  }

  ngOnDestroy(): void {
  }

  savePurchase() {
    const copyToSend = {
      ...this.purchaseCopy,
      part_code: this.purchaseCopy.partCode,
      order_id: this.wareHouse ? 0 : (!this.purchaseCopy.orderID ? this.orderID : this.purchaseCopy.orderID),
      project: this.purchaseCopy.projectID,
      received_date: this.purchaseCopy.status === 'Initial' ? DateHelper.getDateTime(new Date()) : null,
      received: this.purchaseCopy.status === 'Initial' ? 0 : 1,
      status: this.purchaseCopy.status
    };

    delete copyToSend.partCode;
    delete copyToSend.orderID;
    delete copyToSend.projectID;
    delete copyToSend.receivedDate;

    // delete unused object

    // adding new project
    if (this.title === 'Add Item') {
      this.orderService.newPurchase(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].pid) {
            // tell the project about new data update
            $('#newPurchase').modal('hide');
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully added');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
        }
      );
    } else if (this.title === 'Edit Item') {

      this.orderService.updatePurchase(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].pid) {
            $('#newPurchase').modal('hide');
            // tell the project about new data update
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully updated');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
        }
      );
    }

  }

  // get all projects
  getProjects() {
    this.projectService.getAllProjects().subscribe(result => {
      this.projects = this.filterProjects(result);
    });
  }

  // Return only On hold and In progress projects
  filterProjects(projects: Project []) {
    const acceptedStatus =  ['In Progress', 'On Hold'];
    return projects.filter(item => acceptedStatus.includes(item.status));
  }

  private getAllOrders() {
    this.orderService.getAllOrders().subscribe(result => {
      if (result) {
        this.orders = result;
      }
    });
  }
}
