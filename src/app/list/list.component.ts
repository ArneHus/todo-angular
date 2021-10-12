import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';

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

  @Input() list: List = { id: 0, name: "", categoryId: 0, todo: [] };

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

  selectFilter(event: any) {
    var chosenOption: String = event.target.value;
    switch (chosenOption) {
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
