import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Purchase} from '../../../models/purchase.model';
import {OrderService} from '../../../services/order.service';
import {DateHelper} from '../../../helpers/date.helper';
import {ProjectService} from '../../../services/project.service';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-purchase-edit-popup',
  templateUrl: './purchase-edit-popup.component.html',
  styleUrls: ['./purchase-edit-popup.component.css']
})
export class PurchaseEditPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  orderID: number;

  @Input()
  showOnly = false;

  @Input()
  purchase: any = Purchase.getEmptyPurchase();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  purchaseCopy: Purchase;
  projects: any;

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.purchaseCopy = Purchase.getEmptyPurchase();
    this.getProjects();
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
    console.log('ici', (this.title));
    const copyToSend = {
      ...this.purchaseCopy,
      part_code: this.purchaseCopy.partCode,
      order_id: this.orderID,
      project: this.purchaseCopy.projectID
    };

    delete copyToSend.partCode;
    delete copyToSend.orderID;
    delete copyToSend.projectID;

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
      this.projects = result;
    });
  }
}
