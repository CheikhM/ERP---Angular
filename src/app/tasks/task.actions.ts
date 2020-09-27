import { Action } from '@ngrx/store';
import { Task } from './models/task.model';


export const CREATE = '[Tasks] Create';
export const UPDATE = '[Tasks] Update';
export const DELETE = '[Tasks] Delete';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public task: Task){}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public changes: Partial<Task>
  ) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}


export type TaskActions = Create | Update | Delete;
