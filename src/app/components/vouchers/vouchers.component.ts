import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {Voucher} from '../../models/voucher.model';
import {VoucherService} from '../../services/voucher.service';
import {User} from '../../models/user.model';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {


  filteredVouchers: any;

  metaDefinition = [
    {text: 'NO', attribute: 'id'},
    {text: 'Beneficiary', attribute: 'beneficiary', type: 'PLString'},
    {text: 'description', attribute: 'description', type: 'PLString'},
    {text: 'Date', attribute: 'date', type: 'date'},
  ];

  vouchers: Voucher [];
  manageAction = 'Add Voucher';
  voucherTobeManaged: Voucher;
  private toBeDeletedId: any;

  constructor(private sharedService: SharedService,
              private voucherService: VoucherService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllVouchers();
      }
    });

    // search voucher
    this.sharedService.getSearchText().subscribe(item => {
      this.searchVoucher(item.toLocaleLowerCase());
    });
    this.getAllVouchers();
  }

  getAllVouchers() {
    this.voucherService.getAllVouchers().subscribe(
      resp => {
        // console.log(resp);
        this.vouchers = resp;
        this.filteredVouchers = resp;
      },
      error => {},
      () => {
        // console.log(this.vouchers);
      }
    );
  }

// search project by name
  private searchVoucher(text: string) {
    if (this.vouchers) {
      this.filteredVouchers = this.vouchers.filter(voucher => voucher.description.toLowerCase().includes(text));
    }
  }

  editVoucher(voucherID: number) {
    this.manageAction = 'Edit Voucher';
    this.voucherTobeManaged = this.vouchers.find(item => item.id === voucherID);

    $('#newVoucher').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteVoucher(voucherID: number) {
    this.toBeDeletedId = voucherID;

    $('#deleteVoucherModal').modal('show');
  }

  confirmVoucherDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.voucherService.deleteVoucher(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.vouchers = this.vouchers.filter(voucher => voucher.id !== this.toBeDeletedId);
          this.filteredVouchers = this.vouchers;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteVoucherModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Voucher';
    this.voucherTobeManaged = Voucher.getEmptyVoucher();
  }
}
