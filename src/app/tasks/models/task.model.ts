import { TaskComment } from './task-comment.model';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  user: any;
  createdAt: string;
  comments: TaskComment []
}
