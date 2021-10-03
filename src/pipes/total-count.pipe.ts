import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../app/category';

@Pipe({
  name: 'totalCount'
})
export class TotalCountPipe implements PipeTransform {

  transform(value: Array<Category>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(category => {
      category.lists.forEach(list => {
        list.todo.forEach(todo => {
          count++;
        });
      });
    });

    return count;
  }

}
