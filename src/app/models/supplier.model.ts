import * as moment from 'moment';

export class Supplier {
  id: number;
  name: string;
  shortName: string;
  phone: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.shortName = data.short_name;
    this.createdAt = moment(data.created_at, 'YYYY-MM-DD h:i:s').toDate();
  }

  static arrayCast(data: any): Supplier [] {
    const suppliers: Supplier [] = [];
    data.data.forEach(SupplierItem => {
      const task = new Supplier(SupplierItem);
      suppliers.push(task);
    });
    return suppliers;
  }

  static getEmptySupplier(): Supplier {
    return {
      id: null,
      name: null,
      createdAt: null,
      shortName: null,
      phone: null,
    };
  }


}
