import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/category';

@Pipe({
  name: 'totalImportantCount'
})
export class TotalImportantCountPipe implements PipeTransform {

  transform(value: Array<Category>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(category => {
      category.lists.forEach(list => {
        list.todo.forEach(todo => {
          if (todo.isImportant){
            count++;
          }
        });
      });
    });

    return count;
  }

}
