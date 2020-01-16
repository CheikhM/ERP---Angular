export class Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  manager: number;
  code: string;
  poValue: bigint;
  expenses: bigint;
  link: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.startDate = data.start_date;
    this.endDate = data.end_date;
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
