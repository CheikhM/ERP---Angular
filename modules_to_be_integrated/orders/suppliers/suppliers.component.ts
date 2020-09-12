import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Supplier} from '../../../models/supplier.model';
import {OrderService} from '../../../services/order.service';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {


  filteredSuppliers: any;

  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Short Name', attribute: 'shortName', type: 'PLString'},
    {text: 'Phone', attribute: 'phone', type: 'PLString'},
    {text: 'Created at', attribute: 'createdAt', type: 'date'},
  ];

  suppliers: Supplier [];
  manageAction = 'Add Supplier';
  supplierTobeManaged: Supplier;
  private toBeDeletedId: any;
  showOnly: boolean;

  constructor(private sharedService: SharedService,
              private orderService: OrderService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllSuppliers();
      }
    });
    // search supplier
    this.sharedService.getSearchText().subscribe(item => {
      this.searchSupplier(item.toLocaleLowerCase());
    });
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.orderService.getAllSuppliers().subscribe(
      resp => {
        this.suppliers = resp;
        this.filteredSuppliers = resp;
      },
      error => {console.log(error);},
      () => {
        // console.log(this.suppliers);
      }
    );
  }

  // search project by name
  private searchSupplier(text: string) {
    if (this.suppliers) {
      this.filteredSuppliers = this.suppliers.filter(
        supplier =>
          supplier.name.toLowerCase().includes(text) ||
          supplier.phone.toLowerCase().includes(text) ||
          supplier.shortName.toLowerCase().includes(text)
      );
    }
  }

  editSupplier(supplierID: number) {
    this.manageAction = 'Edit Supplier';
    this.supplierTobeManaged = this.suppliers.find(item => item.id === supplierID);

    $('#newSupplier').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteSupplier(supplierID: number) {
    this.toBeDeletedId = supplierID;

    $('#deleteSupplierModal').modal('show');
  }

  confirmSupplierDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.orderService.deleteSupplier(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.suppliers = this.suppliers.filter(supplier => supplier.id !== this.toBeDeletedId);
          this.filteredSuppliers = this.suppliers;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteSupplierModal').modal('hide');
    }
  }

  showSupplier(id: number) {
    this.supplierTobeManaged = this.suppliers.find(item => item.id === id);
    this.manageAction = 'Supplier:';
    this.showOnly = true;

    $('#newSupplier').modal('show');
  }

  exitPopup() {
    this.showOnly = false;
    this.manageAction = 'Add Supplier';
    this.supplierTobeManaged = Supplier.getEmptySupplier();
  }
}
