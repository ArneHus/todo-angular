import { Component } from '@angular/core';
import { List } from './list';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todo';
  lists: Array<List> = [];
  categoryName: string = "";
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  setLists(event: any){
    this.lists = [];
    // Zoek in alle categoriën
    if (event.allCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listCategories();
      });

      this.categoryName = "Overzicht";
    } else {
      //Er wordt maar één lijst doorgegeven
      if (event.singleList != undefined){
        this.lists.push(event.singleList);
        this.categoryName = event.category.name;
      //Er wordt één categorie doorgegeven
      } else {
        event.category.lists.forEach((list: List) => {
          this.lists.push(list);
        });
        this.categoryName = event.category.name;
      }
    }
  }

  listCategories(){
    //Alle lijsten voor alle categorien in lists steken
    this.categories.forEach(category => {
      category.lists.forEach(list => {
        this.lists.push(list);
      });
    });
  }

  toggle_sidebar(){
    if (document.getElementById('page-wrapper')!.classList.contains("toggled")){
      document.getElementById('page-wrapper')!.classList.remove("toggled");
    } else {
      document.getElementById('page-wrapper')!.classList.add("toggled");
    }
  }
}
