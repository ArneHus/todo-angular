import { Component, ViewChild } from '@angular/core';
import { List } from './list/list';
import { Task } from './task/task';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import * as moment from 'moment';
import { ListService } from './list/list.service';
import { Subscription } from 'rxjs';
import { NewCategoryDialogComponent } from './dialog/new-category-dialog/new-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AskConformationDialogComponent } from './dialog/ask-conformation-dialog/ask-conformation-dialog.component';
import { NewListDialogComponent } from './dialog/new-list-dialog/new-list-dialog.component';
import { HostListener } from "@angular/core"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todo';
  lists: Array<List> = [];
  categoryName: string = "";
  color: string = "";
  currentStyles!: {};
  categoryId: number = 0;
  categories: Category[] = [];
  showOptions = false;
  categorySubscription$: Subscription = new Subscription();
  listSubscription$: Subscription = new Subscription();

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private categoryService: CategoryService, private listService: ListService, private matDialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.currentStyles = {
      "background-color": this.color,
      "width": window.innerWidth.toString() + 'px'
    };
  }

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
      this.color = "#00bcd4";
      this.currentStyles = {
        "background-color": this.color,
        "width": window.innerWidth.toString + 'px'
      };
      this.showOptions = false;
    } else if (event.allImportantCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listImportantCategories();
      });

      this.categoryName = "Belangrijk";
      this.color = "#f44336";
      this.currentStyles = {
        "background-color": this.color,
        "width": window.innerWidth.toString + 'px'
      };
      this.showOptions = false;
    }  else if (event.allWeeklyCategories){
      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listWeeklyCategories();
      });

      this.categoryName = "Deze week";
      this.color = "#00bcd4";
      this.currentStyles = {
        "background-color": this.color,
        "width": window.innerWidth.toString + 'px'
      };
      this.showOptions = false;
    } else {
      //Er wordt maar één lijst doorgegeven
      if (event.singleList != undefined){
        event.singleList.todo = event.singleList.todo.sort(this.sortOnDateFunction)
        this.lists.push(event.singleList);
        this.categoryName = event.category.name;
        this.color = event.category.color;
        this.currentStyles = {
          "background-color": this.color,
          "width": window.innerWidth.toString + 'px'
        };
        this.showOptions = false;
      //Er wordt één categorie doorgegeven
      } else {
        this.listService.getListsFromCategory(event.category.id).subscribe(result => {
          result.forEach((list: List) => {
            list.todo = list.todo.sort(this.sortOnDateFunction)
            this.lists.push(list);
          });
          this.categoryName = event.category.name;
          this.color = event.category.color;
          this.currentStyles = {
            "background-color": this.color,
            "width": window.innerWidth.toString + 'px'
          };
          this.categoryId = event.category.id;
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

  refreshLists(){
    this.lists = [];
    this.listService.getListsFromCategory(this.categoryId).subscribe(result => {
      result.forEach((list: List) => {
        list.todo = list.todo.sort(this.sortOnDateFunction)
        this.lists.push(list);
      });
    });
    this.refreshSideBar();
  }

  addList(){
    let dialogRef = this.matDialog.open(NewListDialogComponent, {
      data: { categoryId: this.categoryId },
    });

    dialogRef.componentInstance.updatedList.subscribe((data: any) => {
      this.sidebar.refreshCategories();
      this.listService.getListsFromCategory(this.categoryId).subscribe(result => {
        this.lists = result;
      });
    });
  }

  editCategoryDialog(){
    const category: Category = {id: this.categoryId, name: this.categoryName, color: this.color};
    let dialogRef = this.matDialog.open(NewCategoryDialogComponent, {
      data: { category: category },
    });

    dialogRef.componentInstance.updatedCategory.subscribe((data: any) => {
      this.sidebar.refreshCategories();
      this.categoryService.getCategoryById(this.categoryId).subscribe(result => {
        this.categoryName = result.name;
        this.color = result.color;
        this.currentStyles = {
          "background-color": this.color,
          "width": window.innerWidth.toString + 'px'
        };
      });
    });
  }

  askDeleteCategory(){
    let dialogRef = this.matDialog.open(AskConformationDialogComponent, {
      data: { categoryId: this.categoryId },
    });

    dialogRef.componentInstance.deletedCategory.subscribe((data: any) => {
      this.sidebar.refreshCategories();

      //Alle categoriën ophalen
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result
        this.listCategories();
      });

      this.categoryName = "Overzicht";
      this.color = "#1EB7C3";
      this.currentStyles = {
        "background-color": this.color,
        "width": window.innerWidth.toString + 'px'
      };
      this.showOptions = false;
    });
  }
}