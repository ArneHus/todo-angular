import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { List } from '../list';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  selectedFilter: String = "";
  draggable: boolean = false;
  postTask$: Subscription = new Subscription();
  getTasks$: Subscription = new Subscription();
  chosenFilter: String = "date_asc";
  editables: Array<number> = [];

  @Input() list: List = { id: 0, name: "", categoryId: 0, todo: [] };

  @Output()
  updatedTask: EventEmitter<any> = new EventEmitter();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.todo, event.previousIndex, event.currentIndex);
    var pos = 1;
    this.list.todo.forEach(task => {
      task.orderValue = pos;
      this.taskService.putTask(task.id, task).subscribe(result => {
        //Task is updated
      });
      pos++;
    });
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  new_task() {
    var finishDate = (moment(new Date())).format('DD/MM/yyyy')
    var task: Task = { id: 0, task: "", isImportant: false, finishDate: finishDate, finished: false, orderValue: this.list.todo.length + 1, listId: this.list.id };
    this.postTask$ = this.taskService.postTask(task).subscribe(result => {
      this.editables.push(result.id);
      this.listCategories();
      this.updatedTask.emit();
    });
  }

  listCategories(){
    this.getTasks$ = this.taskService.getTasksByList(this.list.id).subscribe(result => {
      switch (this.chosenFilter) {
        case "date_asc": {
          this.draggable = false;
          this.list.todo = result.sort(this.sortOnDateAscFunction)
          break;
        }
        case "date_desc": {
          this.draggable = false;
          this.list.todo = result.sort(this.sortOnDateDescFunction)
          break;
        }
        case "own_order": {
          this.draggable = true;
          this.list.todo = result.sort(this.sortOnOwnOrderFunction)
          break;
        }
      }
    });
  }

  selectFilter(event: any) {
    this.chosenFilter = event.target.value;
    this.sortList();
  }

  refreshList(event: any){
    if (this.list.id == event.listId){
      this.sortList();
    }
    this.updatedTask.emit();
  }

  deleteTask(event: any){
    this.taskService.deleteTask(event.task.id).subscribe(result => {
      this.list.todo = this.list.todo.filter(obj => obj !== event.task);
      this.sortList();
      this.updatedTask.emit();
    });
  }

  sortList(){
    switch (this.chosenFilter) {
      case "date_asc": {
        this.draggable = false;
        this.list.todo = this.list.todo.sort(this.sortOnDateAscFunction)
        break;
      }
      case "date_desc": {
        this.draggable = false;
        this.list.todo = this.list.todo.sort(this.sortOnDateDescFunction)
        break;
      }
      case "own_order": {
        this.draggable = true;
        this.list.todo = this.list.todo.sort(this.sortOnOwnOrderFunction)
        break;
      }
    }
  }

  sortOnDateAscFunction(a: Task, b: Task){
    var dateA = moment(a.finishDate.toString(), "DD/MM/yyyy").toDate();
    var dateB = moment(b.finishDate.toString(), "DD/MM/yyyy").toDate();
    return dateA > dateB ? 1 : -1;
  };

  sortOnDateDescFunction(a: Task, b: Task){
    var dateA = moment(a.finishDate.toString(), "DD/MM/yyyy").toDate();
    var dateB = moment(b.finishDate.toString(), "DD/MM/yyyy").toDate();
    return dateA > dateB ? -1 : 1;
  };

  sortOnOwnOrderFunction(a: Task, b: Task){
    var orderA = a.orderValue;
    var orderB = b.orderValue;
    return orderA > orderB ? 1 : -1;
  };

}
