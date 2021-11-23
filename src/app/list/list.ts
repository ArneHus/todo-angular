import { Task } from "../task/task";

export interface List {
  id: number;
  categoryId: number;
  name: string;
  todo: Array<Task>;
}