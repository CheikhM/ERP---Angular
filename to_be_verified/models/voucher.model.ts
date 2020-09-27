import {DateHelper} from '../helpers/date.helper';

export class Voucher {
  id: number;
  orderID: number;
  amount: any;
  date: string;
  type: string;
  beneficiary: number;
  description: string;


  constructor(data: any) {
    this.id = data.id;
    this.orderID = data.order_id;
    this.type = data.type;
    this.amount = data.amount;
    this.date = data.date;
    this.beneficiary = data.beneficiary;
    this.description = data.description;
  }

  static arrayCast(data: any): Voucher [] {
    const vouchers: Voucher [] = [];
    data.data.forEach(voucherItem => {
      const voucher = new Voucher(voucherItem);
      vouchers.push(voucher);
    });
    return vouchers;
  }

  static Cast(voucher) {
    voucher.orderID = voucher.order_id;
    delete voucher.order_id;

    return voucher;
  }

  static revertCast(voucher) {
    voucher.order_id = voucher.orderID;
    voucher.date = DateHelper.getDateTime(new Date(voucher.date));
    delete voucher.orderID;

    return voucher;
  }

  static getEmptyVoucher(): Voucher {
    return {
      id: null,
      amount: null,
      date: null,
      type: null,
      orderID: null,
      beneficiary: null,
      description: ''
    };
  }
}
