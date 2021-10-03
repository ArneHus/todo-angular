import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../app/category';

@Pipe({
  name: 'todoCount'
})
export class TodoCountPipe implements PipeTransform {

  transform(value: Category, ...args: unknown[]): number {
    var count = 0;

    value.lists.forEach(list => {
      list.todo.forEach(todo => {
        count++;
      });
    });
    return count;
  }

}
