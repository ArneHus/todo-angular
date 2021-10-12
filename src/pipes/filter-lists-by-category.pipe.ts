import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/list';

@Pipe({
  name: 'filterListsByCategory'
})
export class FilterListsByCategoryPipe implements PipeTransform {

  transform(value: Array<List>, categoryId: number): List[] {
    var categoryLists: List[] = [];
    value.forEach(list => {
      console.log(list.categoryId)
      if (list.categoryId == categoryId){
        categoryLists.push(list);
      }
    });

    return categoryLists;
  }

}
