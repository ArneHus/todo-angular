import { Component, ViewChild } from '@angular/core';
import { List } from './list';
import { Task } from './task';
import { CategoryService } from './category.service';
import { Category } from './category';
import * as moment from 'moment';
import { ListService } from './list.service';
import { Subscription } from 'rxjs';
import { NewCategoryDialogComponent } from './new-category-dialog/new-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todo';
  lists: Array<List> = [];
  category: Category = {id: 0, name: "", color: ""};
  categories: Category[] = [];
  showOptions = false;
  categorySubscription$: Subscription = new Subscription();
  listSubscription$: Subscription = new Subscription();

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private categoryService: CategoryService, private listService: ListService, private matDialog: MatDialog) {}

  setLists(event: any){
    this.lists = [];
    // Zoek in alle categoriën
    if (event.allCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listCategories();
      });

      this.category.name = "Overzicht";
      this.category.color = "#1EB7C3";
      this.showOptions = false;
    } else if (event.allImportantCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listImportantCategories();
      });

      this.category.name = "Belangrijk";
      this.category.color = "#FF0000";
      this.showOptions = false;
    }  else if (event.allWeeklyCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listWeeklyCategories();
      });

      this.category.name = "Deze week";
      this.category.color = "#1EB7C3";
      this.showOptions = false;
    } else {
      //Er wordt maar één lijst doorgegeven
      if (event.singleList != undefined){
        event.singleList.todo = event.singleList.todo.sort(this.sortOnDateFunction)
        this.lists.push(event.singleList);
        this.category = event.category;
        this.showOptions = true;
      //Er wordt één categorie doorgegeven
      } else {
        this.listService.getListsFromCategory(event.category.id).subscribe(result => {
          result.forEach((list: List) => {
            list.todo = list.todo.sort(this.sortOnDateFunction)
            this.lists.push(list);
          });
          this.category = event.category;
          this.showOptions = true;
        });
      }
    }
  }

  listCategories(){
    this.categories.forEach(category => {
      this.listService.getListsFromCategory(category.id).subscribe(result => {
        var lists = result
        lists.forEach(list => {
          list.todo = list.todo.sort(this.sortOnDateFunction)
          this.lists.push(list);
        });
      });
    });
  }

  listImportantCategories(){
    //Alle lijsten voor alle categorien in lists steken
    this.categories.forEach(category => {
      this.listService.getListsFromCategory(category.id).subscribe(result => {
        var lists = result
        lists.forEach(list => {

          //Nieuw lijstje maken waar alle belangrijke items inzitten
          var newList: List = { id: 0, name: "", categoryId: 0, todo: [] };
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
    });
  }

  listWeeklyCategories(){
    //Alle lijsten voor alle categorien in lists steken
    this.categories.forEach(category => {
      this.listService.getListsFromCategory(category.id).subscribe(result => {
        var lists = result
        lists.forEach(list => {

          //Nieuw lijstje maken waar alle belangrijke items inzitten
          var newList: List = { id: 0, name: "", categoryId: 0, todo: [] };
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

  refreshSideBar(){
    this.sidebar.refreshCategories();
  }

  addList(){

  }

  editCategoryDialog(){
    let dialogRef = this.matDialog.open(NewCategoryDialogComponent, {
      data: { category: this.category },
    });

    dialogRef.componentInstance.updatedCategory.subscribe((data: any) => {
      this.sidebar.refreshCategories();
      this.categoryService.getCategoryById(this.category.id).subscribe(result => {
        this.category = result;
      });
    });
  }

  askDeleteCategory(){

  }
}