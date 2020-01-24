import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {Visit} from '../../../../models/visit.model';
import {AuthService} from '../../../../services/auth.service';
import {SalesService} from '../../../../services/sales.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../../services/shared.service';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-visit-popup',
  templateUrl: './edit-visit-popup.component.html',
  styleUrls: ['./edit-visit-popup.component.css']
})
export class EditVisitPopupComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  title: string;

  @Input()
  visit: any = Visit.getEmptyVisit();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  visitCopy: Visit;

  managers: User [];

  constructor(private authService: AuthService,
              private saleService: SalesService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.visitCopy = Visit.getEmptyVisit();
    this.getUsers(3);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visit) {
      this.visitCopy = {...this.visit};
    }
  }

  getUsers(role: number) {
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

  saveVisit() {
    const copyToSend = {
      ...this.visitCopy,
      client_name: this.visitCopy.clientName,
      last_update: this.visitCopy.lastUpdate,
    };

    // delete unused object
    delete copyToSend.clientName;
    delete copyToSend.lastUpdate;

    // adding new project
    if (this.title === 'Add Visit') {

      this.saleService.newVisit(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].vid) {
            // tell the project about new data update
            $('#newVisit').modal('hide');
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
    } else if (this.title === 'Edit Visit') {

      this.saleService.updateVisit(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].vid) {
            $('#newVisit').modal('hide');
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
