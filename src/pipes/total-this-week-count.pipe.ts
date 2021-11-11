import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list';
import * as moment from 'moment';

@Pipe({
  name: 'totalThisWeekCount'
})
export class TotalThisWeekCountPipe implements PipeTransform {

  transform(value: Array<List>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(list => {
      list.todo.forEach(todo => {
        let publishDate = moment(todo.finishDate.toString(), "DD/MM/yyyy").toDate();
        var nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (publishDate < nextWeek && publishDate > yesterday && !todo.finished){
          count++;
        }
      });
    });

    return count;
  }

}
