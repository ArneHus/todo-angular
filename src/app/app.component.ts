import { Component } from '@angular/core';
import { List } from './list';
import { Task } from './task';
import { CategoryService } from './category.service';
import { Category } from './category';
import * as moment from 'moment';

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
    } else if (event.allImportantCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listImportantCategories();
      });

      this.categoryName = "Belangrijk";
    }  else if (event.allWeeklyCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listWeeklyCategories();
      });

      this.categoryName = "Deze week";
    } else {
      //Er wordt maar één lijst doorgegeven
      if (event.singleList != undefined){
        event.singleList.todo = event.singleList.todo.sort(this.sortOnDateFunction)
        this.lists.push(event.singleList);
        this.categoryName = event.category.name;
      //Er wordt één categorie doorgegeven
      } else {
        event.category.lists.forEach((list: List) => {
          list.todo = list.todo.sort(this.sortOnDateFunction)
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
        list.todo = list.todo.sort(this.sortOnDateFunction)
        this.lists.push(list);
      });
    });
  }

  listImportantCategories(){
    //Alle lijsten voor alle categorien in lists steken
    this.categories.forEach(category => {
      category.lists.forEach(list => {

        //Nieuw lijstje maken waar alle belangrijke items inzitten
        var newList: List = {name: "", todo: []};
        newList.name = list.name

        //Belangrijke items toevoegen aan nieuwe lijst
        list.todo.forEach(todo => {
          if (todo.isImportant){
            newList.todo.push(todo);
          }
        });

        //Enkel lijsten die niet leeg zijn laten zien
        if (newList.todo.length != 0){
          newList.todo = newList.todo.sort(this.sortOnDateFunction)
          this.lists.push(newList);
        }
      });
    });
  }

  listWeeklyCategories(){
    //Alle lijsten voor alle categorien in lists steken
    this.categories.forEach(category => {
      category.lists.forEach(list => {

        //Nieuw lijstje maken waar alle belangrijke items inzitten
        var newList: List = {name: "", todo: []};
        newList.name = list.name

        //Belangrijke items toevoegen aan nieuwe lijst
        list.todo.forEach(todo => {
          let publishDate = moment(todo.finishDate.toString(), "DD/MM/yyyy").toDate();
          var nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (publishDate < nextWeek && publishDate > yesterday){
            newList.todo.push(todo);
          }
        });

        //Enkel lijsten die niet leeg zijn laten zien
        if (newList.todo.length != 0){
          newList.todo = newList.todo.sort(this.sortOnDateFunction)
          this.lists.push(newList);
        }
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

  sortOnDateFunction(a: Task, b: Task){
    var dateA = moment(a.finishDate.toString(), "DD/MM/yyyy").toDate();
    var dateB = moment(b.finishDate.toString(), "DD/MM/yyyy").toDate();
    return dateA > dateB ? 1 : -1;
  };
}