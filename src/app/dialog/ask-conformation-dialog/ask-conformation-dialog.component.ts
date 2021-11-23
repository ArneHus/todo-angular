import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';
import { ListService } from '../../list/list.service';
import { TaskService } from '../../task/task.service';

@Component({
  selector: 'app-ask-conformation-dialog',
  templateUrl: './ask-conformation-dialog.component.html',
  styleUrls: ['./ask-conformation-dialog.component.scss']
})
export class AskConformationDialogComponent implements OnInit {

  text: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: { categoryId: number, listId: number }, private categoryService: CategoryService, private listService: ListService, private taskService: TaskService, public dialogRef: MatDialogRef<AskConformationDialogComponent>) { }

  @Output()
  deletedCategory: EventEmitter<any> = new EventEmitter();

  @Output()
  deletedList: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (typeof this.data.categoryId !== 'undefined'){
      this.text = "Deze actie zal ook alle taken en lijsten van deze categorie verwijderen.";
    } else if (typeof this.data.listId !== 'undefined'){
      this.text = "Deze actie zal ook alle taken van deze lijst verwijderen.";
    }
  }

  delete(){
    if (typeof this.data.categoryId !== 'undefined'){
      this.deleteLists();
      this.categoryService.deleteCategory(this.data.categoryId).subscribe(result => {
        this.dialogRef.close();
        this.deletedCategory.emit();
      });
    } else if (typeof this.data.listId !== 'undefined'){
      this.listService.deleteList(this.data.listId).subscribe(result => {
        this.dialogRef.close();
        this.deletedList.emit();
      })
    }
  }

  deleteLists(){
    this.listService.getListsFromCategory(this.data.categoryId).subscribe(result => {
      result.forEach(list => {
        this.listService.deleteList(list.id).subscribe(deletedList => {

        });
      });
    });
  }
}
