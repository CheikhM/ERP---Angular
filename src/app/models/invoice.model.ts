export class Invoice {
  id: number;
  projectID: number;
  billNum: string;
  amount: any;
  date: string;

  constructor(data: any) {
    this.id = data.id;
    this.projectID = data.project_id;
    this.billNum = data.bill_num;
    this.amount = data.amount;
    this.date = data.date;
  }

  static arrayCast(data: any): Invoice [] {
    const invoices: Invoice [] = [];
    data.data.forEach(invoiceItem => {
      const invoice = new Invoice(invoiceItem);
      invoices.push(invoice);
    });
    return invoices;
  }

  static Cast(invoice) {
    invoice.billNum = invoice.bill_num;
    delete invoice.bill_num;

    return invoice;
  }

  static revertCast(invoice) {
    invoice.bill_num = invoice.billNum;
    invoice.project_id = invoice.projectID;
    delete invoice.billNum;
    delete invoice.projectID;

    return invoice;
  }

  static getEmptyInvoice(): Invoice {
    return {
      id: null,
      projectID: null,
      billNum: null,
      amount: null,
      date: null,
    };
  }
}
