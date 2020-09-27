export class Deal {
  id: number;
  name: string;
  clientName: string;
  contact: string;
  status: string;
  manager: number;
  expectedClose: Date;
  lastUpdate: Date;
  value: any;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.clientName = data.client_name;
    this.value = data.value;
    this.status = data.status;
    this.manager = data.manager;
    this.expectedClose = data.expected_close;
    this.lastUpdate = data.last_update;
    this.contact = data.contact;
  }

  static arrayCast(data: any): Deal [] {
    const deals: Deal [] = [];
    data.data.forEach(dealItem => {
      const bid = new Deal(dealItem);
      deals.push(bid);
    });
    return deals;
  }

  static getEmptyDeal(): Deal {
    return {
      id: null,
      name: null,
      clientName: null,
      status: null,
      contact: null,
      lastUpdate: null,
      expectedClose: null,
      manager: null,
      value: null
    };
  }

}
