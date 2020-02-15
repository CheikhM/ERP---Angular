import * as moment from 'moment';

export class Project {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  manager: number;
  code: string;
  poValue: bigint;
  expenses: bigint;
  link: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.startDate = moment(data.start_date, 'DD/MM/YYYY').toDate();
    this.endDate = moment(data.end_date, 'DD/MM/YYYY').toDate();
    this.status = data.status;
    this.manager = data.manager;
    this.code = data.code;
    this.poValue = data.po_value;
    this.expenses = data.expenses;
    this.link = data.link;
  }

  static arrayCast(data: any): Project [] {
    const projects: Project [] = [];
    data.data.forEach(projectItem => {
      const project = new Project(projectItem);
      projects.push(project);
    });
    return projects;
  }

  static getEmptyProject(): Project {
    return  {
      id: null,
      name: null,
      startDate: null,
      endDate: null,
      status: null,
      manager: null,
      code: null,
      poValue: null,
      expenses: null,
      link: null
    };
  }

}
