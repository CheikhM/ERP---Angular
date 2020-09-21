export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number [];
  status: string;
  user: any;
  createdAt: string;
  comments: any []
}
