import { List } from "./list";

export interface Category {
  name: string;
  lists: Array<List>;
}