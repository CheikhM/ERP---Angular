import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Order} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {User} from '../../../models/user.model';
import {Supplier} from '../../../models/supplier.model';
import {Project} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-order-popup',
  templateUrl: './edit-order-popup.component.html',
  styleUrls: ['./edit-order-popup.component.css']
})
export class EditOrderPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  orderCopy: Order;
  vendors: Supplier [];
  directors: User [];
  projects: Project [];
  currentUser: string;

  @Input()
  order: any = Order.getEmptyOrder(this.currentUser);

  constructor(private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private authService: AuthService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.currentUser = LocalStorageHelper.getItem('user').name;
    this.orderCopy = Order.getEmptyOrder(this.currentUser);
    this.getVendors();
    this.getDirectors();
    this.getProjects();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.order) {
      this.orderCopy = {...this.order};
      //console.log(this.orderCopy);
    }
  }

  // get all known vendors
  getVendors() {
    this.orderService.getAllSuppliers().subscribe(result => this.vendors = result);
  }

  // get all directors
  getDirectors() {
    this.authService.getAllUsers('CEO').subscribe(result => this.directors = result);
  }

  // get all directors
  getProjects() {
    this.projectService.getAllProjects().subscribe(result => {
      this.projects = result;
      //console.log(this.projects);
    });
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

  saveOrder() {
    const copyToSend = {
      ...this.orderCopy,
      created_at: this.orderCopy.createdAt,
      approved_by: this.orderCopy.approvedBy,
      prepared_by: this.orderCopy.preparedBy,
      ship_to: this.orderCopy.shipTo,
    };

    // delete unused object
    delete copyToSend.createdAt;
    delete copyToSend.preparedBy;
    delete copyToSend.approvedBy;
    delete copyToSend.shipTo;
    delete copyToSend.num;

    // adding new project
    if (this.title === 'Add Order') {

      this.orderService.newOrder(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].oid) {
            // tell the project about new data update
            $('#newOrder').modal('hide');
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
    } else if (this.title === 'Edit Order') {

      this.orderService.updateOrder(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].oid) {
            $('#newOrder').modal('hide');
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

