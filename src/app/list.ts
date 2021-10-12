import { Task } from "./task";
import { Category } from "./category";

export interface List {
  id: number;
  categoryId: number;
  name: string;
  todo: Array<Task>;
}