import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Voucher} from '../../../models/voucher.model';
import {VoucherService} from '../../../services/voucher.service';
import {User} from '../../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../models/order.model';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {

  readonly currentVoucherId: number;

  voucher = Voucher.getEmptyVoucher();
  beneficiary: string;
  order: string;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private voucherService: VoucherService,
              private orderService: OrderService) {
    // get the current visit id
    this.currentVoucherId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentVoucherId);

  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/vouchers/voucher/');
    this.getCurrentVoucher();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => this.getCurrentVoucher(true));


  }

  private getCurrentVoucher(remote = null) {
    // if no current voucher was found
    // todo replace true with "remote"
    if (true) {
      this.voucherService.getVoucherByID(this.currentVoucherId).subscribe(
        result => {
          if (result && result.status === '200_OK') {
            this.voucher = new Voucher(result.data);
          }
        },
        error => {
        },
        () => {
          this.getBeneficiary(this.voucher.beneficiary);
          this.getOrder(this.voucher.orderID);
        }
      );

      return true;
    }
  }


  confirmVoucherDelete($event: any) {

  }

  triggerVoucherEdit() {
    $('#newVoucher').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  confirmUserDelete($event: any) {

  }

  private getBeneficiary(bid: number) {
    if (bid) {
      this.orderService.getBeneficiaryByID(bid).subscribe(
        res => {
          if (res) {
            this.beneficiary = res.name;
          }
        });
    }
  }

  private getOrder(oid: number) {
    if (oid) {
      this.orderService.getOrderByID(oid).subscribe(
        res => {
          if (res && res['status'] === '200_OK' && res['data']) {
            const order = new Order(res['data']);
            this.order = order.num;
          }
        });
    }
  }

  printVoucher() {
    $('#pdfViewer').modal('show');
  }
}
