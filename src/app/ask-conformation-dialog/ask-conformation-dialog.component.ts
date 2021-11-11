import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ListService } from '../list.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-ask-conformation-dialog',
  templateUrl: './ask-conformation-dialog.component.html',
  styleUrls: ['./ask-conformation-dialog.component.scss']
})
export class AskConformationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { categoryId: number }, private categoryService: CategoryService, private listService: ListService, private taskService: TaskService, public dialogRef: MatDialogRef<AskConformationDialogComponent>) { }

  @Output()
  deletedCategory: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  deleteCategory(){
    this.deleteLists();
    this.categoryService.deleteCategory(this.data.categoryId).subscribe(result => {
      this.dialogRef.close();
      this.deletedCategory.emit();
    });
  }

  deleteLists(){
    console.log("Ik ga lijsten verwijderen");
    this.listService.getListsFromCategory(this.data.categoryId).subscribe(result => {
      console.log("Lijsten", result);
      result.forEach(list => {
        this.listService.deleteList(list.id).subscribe(deletedList => {
          
        });
      });
    });
  }
}
