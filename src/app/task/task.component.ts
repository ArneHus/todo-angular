import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = { task: "", isImportant: false, finishDate: "", finished: false };

  setImportant(id: number){
    if (this.task.isImportant){
      this.task.isImportant = false;
    } else {
      this.task.isImportant = true;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
