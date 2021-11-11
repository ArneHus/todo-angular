import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../app/list';

@Pipe({
  name: 'totalCount'
})
export class TotalCountPipe implements PipeTransform {

  transform(value: Array<List>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(list => {
      list.todo.forEach(todo => {
        if (!todo.finished){
          count++;
        }
      });
    });

    return count;
  }

}
