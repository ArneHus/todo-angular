import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list/list';

@Pipe({
  name: 'todoCountList',
})
export class TodoCountListPipe implements PipeTransform {
  transform(value: List): number {
    var count = 0;

    value.todo.forEach((todo) => {
      if (!todo.finished) {
        count++;
      }
    });
    return count;
  }
}
