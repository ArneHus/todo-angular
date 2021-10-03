import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/category';
import * as moment from 'moment';

@Pipe({
  name: 'totalThisWeekCount'
})
export class TotalThisWeekCountPipe implements PipeTransform {

  transform(value: Array<Category>, ...args: unknown[]): number {
    var count = 0;

    value.forEach(category => {
      category.lists.forEach(list => {
        list.todo.forEach(todo => {
          let publishDate = moment(todo.finishDate.toString(), "DD/MM/yyyy").toDate();
          var nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (publishDate < nextWeek && publishDate > yesterday){
            count++;
          }
        });
      });
    });

    return count;
  }

}
