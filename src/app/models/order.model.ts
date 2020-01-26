import {User} from './user.model';

export class Order {
  id: number;
  num: number;
  vendor: number;
  shipTo: string;
  discount: string;
  preparedBy: string;
  approvedBy: string;
  currency: string;
  status: string;
  terms: string;
  link: string;
  project: number;
  vat: boolean;
  date: Date;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.num = data.num;
    this.vendor = data.vendor;
    this.shipTo = data.ship_to;
    this.discount = data.discount;
    this.preparedBy = data.prepared_by;
    this.approvedBy = data.approved_by;
    this.currency = data.currency;
    this.status = data.status;
    this.terms = data.terms;
    this.link = data.link;
    this.project = data.project;
    this.vat = data.vat;
    this.createdAt = data.created_at;
    this.date = data.date;
  }

  static arrayCast(data: any): Order [] {
    const Orders: Order [] = [];
    data.data.forEach(orderItem => {
      const order = new Order(orderItem);
      Orders.push(order);
    });
    return Orders;
  }

  static getEmptyOrder(currentUser: string): Order {
    return {
      id: null,
      num: null,
      vendor: null,
      shipTo: null,
      discount: null,
      preparedBy: currentUser,
      approvedBy: null,
      currency: null,
      status: null,
      terms: null,
      link: null,
      project: null,
      vat: null,
      createdAt: null,
      date: null
    };
  }
}
