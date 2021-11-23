import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list/list';

@Pipe({
  name: 'filterListsByCategory'
})
export class FilterListsByCategoryPipe implements PipeTransform {

  transform(value: Array<List>, categoryId: number): List[] {
    var categoryLists: List[] = [];
    value.forEach(list => {
      if (list.categoryId == categoryId){
        categoryLists.push(list);
      }
    });

    return categoryLists;
  }

}
