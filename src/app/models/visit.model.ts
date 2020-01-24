export class Visit {
  id: number;
  clientName: string;
  contact: string;
  reason: string;
  manager: number;
  date: Date;
  lastUpdate: Date;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.contact = data.contact;
    this.date = data.date;
    this.manager = data.manager;
    this.lastUpdate = data.last_update;
    this.clientName = data.client_name;
  }

  static arrayCast(data: any): Visit [] {
    const visits: Visit [] = [];
    data.data.forEach(vistItem => {
      const visit = new Visit(vistItem);
      visits.push(visit);
    });
    return visits;
  }

  static getEmptyVisit(): Visit {
    return {
      id: null,
      reason: null,
      clientName: null,
      contact: null,
      lastUpdate: null,
      date: null,
      manager: null,
    };
  }

}
