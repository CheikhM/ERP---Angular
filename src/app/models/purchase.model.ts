export class Purchase {
  id: number;
  partCode: string;
  orderID: number;
  projectID: number;
  quantity: number;
  rate: any;
  description: string;
  received: any;


  constructor(data: any) {
    this.id = data.id;
    this.orderID = data.order_id;
    this.partCode = data.part_code;
    this.projectID = data.project;
    this.quantity = data.quantity;
    this.rate = data.rate;
    this.description = data.description;
    this.received = data.received;
  }

  static arrayCast(data: any): Purchase [] {
    const purchases: Purchase [] = [];
    data.data.forEach(purchaseItem => {
      const purchase = new Purchase(purchaseItem);
      purchases.push(purchase);
    });
    return purchases;
  }

  static getEmptyPurchase(): Purchase {
    return {
      id: null,
      partCode: null,
      orderID: null,
      projectID: null,
      quantity: null,
      rate: null,
      description: null,
      received: 0
    };
  }
}
