export class Bid {
  id: number;
  name: string;
  clientName: string;
  cost: string;
  status: string;
  manager: number;
  submissionDate: Date;
  openingDate: Date;
  comment: string;
  link: string;
  letterOfGuarantee: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.clientName = data.client_name;
    this.cost = data.cost;
    this.status = data.status;
    this.manager = data.manager;
    this.submissionDate = data.submission_date;
    this.comment = data.comment;
    this.link = data.link;
    this.letterOfGuarantee = data.letter_of_guarantee;
    this.openingDate = data.opening_date;
  }

  static arrayCast(data: any): Bid [] {
    const bids: Bid [] = [];
    data.data.forEach(bidItem => {
      const bid = new Bid(bidItem);
      bids.push(bid);
    });
    return bids;
  }

  static getEmptyBid(): Bid {
    return {
      id: null,
      name: null,
      clientName: null,
      cost: null,
      status: null,
      manager: null,
      comment: null,
      link: null,
      submissionDate: null,
      letterOfGuarantee: null,
      openingDate: null,
    };
  }

}
