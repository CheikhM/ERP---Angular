export class Task {
  id: number;
  name: string;
  description: string;
  priority: number [];
  status: string;
  owner: number;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.priority = data.priority;
    this.description = data.description;
    this.createdAt = data.created_at;
    this.owner = data.owner;
  }

  static arrayCast(data: any): Task [] {
    const tasks: Task [] = [];
    data.data.forEach(TaskItem => {
      const task = new Task(TaskItem);
      tasks.push(task);
    });
    return tasks;
  }

  static getEmptyTask(): Task {
    return {
      id: null,
      name: null,
      createdAt: null,
      description: null,
      priority: null,
      status: null,
      owner: null
    };
  }


}
