import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list/list';

@Pipe({
  name: 'todoCount'
})
export class TodoCountPipe implements PipeTransform {

  transform(value: List[]): number {
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
