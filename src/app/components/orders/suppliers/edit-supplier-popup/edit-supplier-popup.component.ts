import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../../services/shared.service';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {Supplier} from '../../../../models/supplier.model';
import {OrderService} from '../../../../services/order.service';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-supplier-popup',
  templateUrl: './edit-supplier-popup.component.html',
  styleUrls: ['./edit-supplier-popup.component.css']
})
export class EditSupplierPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  supplier: any = Supplier.getEmptySupplier();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  supplierCopy: Supplier;

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.supplierCopy = Supplier.getEmptySupplier();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.supplier) {
      this.supplierCopy = {...this.supplier};
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

  saveSupplier() {
    const copyToSend = {
      ...this.supplierCopy,
      created_at: this.supplierCopy.createdAt,
      short_name: this.supplierCopy.shortName,
    };

    // delete unused object
    delete copyToSend.createdAt;
    delete copyToSend.shortName;

    // adding new project
    if (this.title === 'Add Supplier') {

      this.orderService.newSupplier(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
            // tell the project about new data update
            $('#newSupplier').modal('hide');
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
    } else if (this.title === 'Edit Supplier') {

      this.orderService.updateSupplier(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
            $('#newSupplier').modal('hide');
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

}

