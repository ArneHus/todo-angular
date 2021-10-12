import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() draggable: boolean = false;
  @Input() task: Task = { id: 0, task: "", isImportant: false, finishDate: "", finished: false, orderValue: 0, listId: 0 };

  setImportant(id: number){
    if (this.task.isImportant){
      this.task.isImportant = false;
      this.taskService.putTask(this.task.id, this.task).subscribe(result => {
        //Task is updated
      });
    } else {
      this.task.isImportant = true;
      this.taskService.putTask(this.task.id, this.task).subscribe(result => {
        //Task is updated
      });
    }
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

}
