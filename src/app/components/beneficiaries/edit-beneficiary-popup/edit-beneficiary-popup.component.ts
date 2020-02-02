import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Beneficiary} from '../../../models/beneficiary.model';
import {OrderService} from '../../../services/order.service';
import {DateHelper} from '../../../helpers/date.helper';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-beneficiary-popup',
  templateUrl: './edit-beneficiary-popup.component.html',
  styleUrls: ['./edit-beneficiary-popup.component.css']
})
export class EditBeneficiaryPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  showOnly = false;

  @Input()
  beneficiary: any = Beneficiary.getEmptyBeneficiary();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  beneficiaryCopy: Beneficiary;

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.beneficiaryCopy = Beneficiary.getEmptyBeneficiary();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.beneficiary) {
      this.beneficiaryCopy = {...this.beneficiary};
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

  saveBeneficiary() {
    const copyToSend = {
      ...this.beneficiaryCopy,
      created_at: DateHelper.getDateTime(new Date()),
      short_name: this.beneficiaryCopy.shortName,
    };

    // delete unused object
    delete copyToSend.createdAt;
    delete copyToSend.shortName;

    // adding new project
    if (this.title === 'Add Beneficiary') {
      this.orderService.newBeneficiary(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
            // tell the project about new data update
            $('#newBeneficiary').modal('hide');
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
    } else if (this.title === 'Edit Beneficiary') {
      delete copyToSend.created_at;

      this.orderService.updateBeneficiary(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].sid) {
            $('#newBeneficiary').modal('hide');
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

