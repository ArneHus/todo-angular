import { Task } from "./task";

export interface List {
  name: string;
  todo: Array<Task>;
}