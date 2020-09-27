import {DateHelper} from '../helpers/date.helper';

export class Purchase {
  id: number;
  partCode: string;
  orderID: number;
  projectID: number;
  quantity: number;
  rate: any;
  description: string;
  received: any;
  receivedDate: string;
  status: string;


  constructor(data: any) {
    this.id = data.id;
    this.orderID = data.order_id;
    this.partCode = data.part_code;
    this.projectID = data.project;
    this.quantity = data.quantity;
    this.rate = data.rate;
    this.description = data.description;
    this.received = data.received;
    this.receivedDate = data.received_date;
    this.status = data.status;
  }

  static arrayCast(data: any): Purchase [] {
    const purchases: Purchase [] = [];
    data.data.forEach(purchaseItem => {
      const purchase = new Purchase(purchaseItem);
      purchases.push(purchase);
    });
    return purchases;
  }

  static getEmptyPurchase(wareHouse: boolean): Purchase {
    return {
      id: null,
      partCode: null,
      orderID: null,
      projectID: null,
      quantity: null,
      rate: null,
      description: '',
      received: 0,
      receivedDate: wareHouse ? DateHelper.getDateTime(new Date()) : null,
      status: wareHouse ? 'Check In' : 'Initial'
    };
  }
}
