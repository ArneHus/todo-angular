import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() draggable: boolean = false;
  @Input() task: Task = { id: 0, task: "", isImportant: false, finishDate: "", finished: false, orderValue: 0, listId: 0 };
  @Input() isEditable: boolean = false;

  @Output()
  newTask: EventEmitter<any> = new EventEmitter();

  @Output()
  deleteTaskEvent: EventEmitter<any> = new EventEmitter();


  setImportant(){
    this.task.isImportant = !this.task.isImportant
    this.taskService.putTask(this.task.id, this.task).subscribe(result => {
      //Task is updated
    });
  }

  editTask(){
    this.isEditable = !this.isEditable;
  }

  deleteTask(){
    var task = this.task;
    this.deleteTaskEvent.emit({task});
  }

  // reactive form
  taskForm = new FormGroup({
    task: new FormControl(''),
    finishDate: new FormControl('')
  });

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm.setValue({
      task: this.task.task,
      finishDate: this.task.finishDate
    });
  }

  onSubmit(): void {
    this.task.finishDate = moment(this.taskForm.get("finishDate")!.value).format("DD/MM/yyyy").toString();
    this.task.task = this.taskForm.get("task")!.value;
    this.taskService.putTask(this.task.id, this.task).subscribe(result => {
      this.isEditable = false;

      var listId = this.task.listId;
      this.newTask.emit({listId});
    });
  }
}
