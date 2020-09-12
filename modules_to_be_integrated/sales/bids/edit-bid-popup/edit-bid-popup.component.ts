import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../../models/project.model';
import {Bid} from '../../../../models/bid.model';
import {NgModel} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {AuthService} from '../../../../services/auth.service';
import {SalesService} from '../../../../services/sales.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../../services/shared.service';
import {DateHelper} from '../../../../helpers/date.helper';

declare var $: any;

@Component({
  selector: 'app-edit-bid-popup',
  templateUrl: './edit-bid-popup.component.html',
  styleUrls: ['./edit-bid-popup.component.scss']
})
export class EditBidPopupComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  title: string;

  @Input()
  bid: any = Bid.getEmptyBid();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  bidCopy: Bid;

  managers: User [];

  constructor(private authService: AuthService,
              private saleService: SalesService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.bidCopy = Bid.getEmptyBid();
    this.getUsers('SM');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bid) {
      this.bidCopy = {...this.bid};
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

  saveBid() {
    const copyToSend = {
      ...this.bidCopy,
      client_name: this.bidCopy.clientName,
      opening_date: DateHelper.getDateTime(new Date(this.bidCopy.openingDate)),
      submission_date: DateHelper.getDateTime(new Date(this.bidCopy.submissionDate)),
      letter_of_guarantee: this.bidCopy.letterOfGuarantee,
    };

    // delete unused object
    delete copyToSend.clientName;
    delete copyToSend.openingDate;
    delete copyToSend.submissionDate;
    delete copyToSend.letterOfGuarantee;

    // adding new project
    if (this.title === 'Add Bid') {
      this.saleService.newBid(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].bid) {
            // tell the project about new data update
            $('#newBid').modal('hide');
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
    } else if (this.title === 'Edit Bid') {

      this.saleService.updateBid(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].bid) {
            $('#newBid').modal('hide');
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
