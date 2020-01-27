import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Purchase} from '../../../models/purchase.model';
import {OrderService} from '../../../services/order.service';
import {DateHelper} from '../../../helpers/date.helper';


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
  showOnly = false;

  @Input()
  purchase: any = Purchase.getEmptyPurchase();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  purchaseCopy: Purchase;
  projects: any;

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.purchaseCopy = Purchase.getEmptyPurchase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes);
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
    };

    // delete unused object

    // adding new project
    if (this.title === 'Add Purchase') {
      this.orderService.newPurchase(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
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
    } else if (this.title === 'Edit Purchase') {

      this.orderService.updatePurchase(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
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

  actionProject() {

  }
}
