import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {SalesService} from '../../../services/sales.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Voucher} from '../../../models/voucher.model';
import {VoucherService} from '../../../services/voucher.service';
import {DateHelper} from '../../../helpers/date.helper';
import {Beneficiary} from '../../../models/beneficiary.model';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../models/order.model';
import { localProject } from 'src/app/config';


declare var $: any;

@AutoUnsubscribe()

@Component({
  selector: 'app-edit-voucher-popup',
  templateUrl: './edit-voucher-popup.component.html',
  styleUrls: ['./edit-voucher-popup.component.scss']
})
export class EditVoucherPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  voucher: any = Voucher.getEmptyVoucher();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  voucherCopy: Voucher;
  beneficiaries: Beneficiary[];
  orders: Order[];
  projectName = localProject;


  constructor(private voucherService: VoucherService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.voucherCopy = Voucher.getEmptyVoucher();
    this.getAllBeneficiaries();
    this.getAllOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucher) {
      this.voucherCopy = {...this.voucher};
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

  saveVoucher() {
    const createdAt = DateHelper.getDateTime(new Date());

    const copyToSend = {
      ...this.voucherCopy,
      date: createdAt,
      order_id: this.voucherCopy.orderID,
    };
    // delete unused object
    delete copyToSend.orderID;

    // adding new project
    if (this.title === 'Add Voucher') {

      this.voucherService.newVoucher(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].vid) {
            // tell the project about new data update
            $('#newVoucher').modal('hide');
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
    } else if (this.title === 'Edit Voucher') {
      delete copyToSend.date;

      this.voucherService.updateVoucher(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].vid) {
            $('#newVoucher').modal('hide');
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

  private getAllBeneficiaries() {
    this.orderService.getAllBeneficiaries().subscribe(result => this.beneficiaries = result);
  }

  private getAllOrders() {
    this.orderService.getAllOrders().subscribe(result => this.orders = this.filterOrders(result));
  }

  // Return only On hold and In progress projects
  filterOrders(orders: Order []) {
    const acceptedStatus =  ['Opened'];
    return orders.filter(item => acceptedStatus.includes(item.status));
  }
}
