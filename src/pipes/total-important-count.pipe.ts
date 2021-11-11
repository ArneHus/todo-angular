import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list';

@Pipe({
  name: 'totalImportantCount'
})
export class TotalImportantCountPipe implements PipeTransform {

  transform(value: Array<List>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(list => {
      list.todo.forEach(todo => {
        if (todo.isImportant && !todo.finished){
          count++;
        }
      });
    });

    return count;
  }

}
