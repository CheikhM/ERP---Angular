import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {Deal} from '../../../../models/deal.model';
import {AuthService} from '../../../../services/auth.service';
import {SalesService} from '../../../../services/sales.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../../services/shared.service';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';
import {DateHelper} from '../../../../helpers/date.helper';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-deal-popup',
  templateUrl: './edit-deal-popup.component.html',
  styleUrls: ['./edit-deal-popup.component.scss']
})
export class EditDealPopupComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  title: string;

  @Input()
  deal: any = Deal.getEmptyDeal();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  dealCopy: Deal;

  managers: User [];

  constructor(private authService: AuthService,
              private saleService: SalesService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.dealCopy = Deal.getEmptyDeal();
    this.getUsers('SM');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deal) {
      this.dealCopy = {...this.deal};
    }
  }

  getUsers(role: string) {
    this.authService.getAllUsers(role).subscribe(result => this.managers = result);
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

  saveDeal() {
    const copyToSend = {
      ...this.dealCopy,
      client_name: this.dealCopy.clientName,
      expected_close: DateHelper.getDateTime(new Date(this.dealCopy.expectedClose)),
      last_update: this.dealCopy.lastUpdate,
    };

    // delete unused object
    delete copyToSend.clientName;
    delete copyToSend.lastUpdate;
    delete copyToSend.expectedClose;

    // adding new project
    if (this.title === 'Add Deal') {

      this.saleService.newDeal(copyToSend).subscribe(
        result => {
          //console.log(result);
          if (result['status'] === '200_OK' && result['data'].did) {
            // tell the project about new data update
            $('#newDeal').modal('hide');
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
    } else if (this.title === 'Edit Deal') {

      this.saleService.updateDeal(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].did) {
            $('#newDeal').modal('hide');
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
