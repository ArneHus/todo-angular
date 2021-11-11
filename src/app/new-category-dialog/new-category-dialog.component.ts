import { Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss']
})
export class NewCategoryDialogComponent implements OnInit {

  possibleColors = ["#f44336", "#e91e63", "#9c27b0", "#03a9f4", "#00bcd4", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"];
  color: string = "";

  @Output()
  updatedCategory: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { category: Category }, private categoryService: CategoryService, public dialogRef: MatDialogRef<NewCategoryDialogComponent>) { }

  ngOnInit(): void {
    if (this.data != null){
      this.categoryForm.setValue({
        category: this.data.category.name,
        color: this.data.category.color
      });
      this.color = this.data.category.color;
    }
  }

  categoryForm = new FormGroup({
    category: new FormControl(''),
    color: new FormControl('')
  });

  onSubmit(){
    if (this.data != null){
      const category: Category = {id: this.data.category.id, name: this.categoryForm.get("category")!.value, color: this.categoryForm.get("color")!.value};
      this.categoryService.putCategory(this.data.category.id, category).subscribe(result => {
        this.dialogRef.close();
        this.updatedCategory.emit();
      });
    } else {
      const category: Category = {id: 0, name: this.categoryForm.get("category")!.value, color: this.categoryForm.get("color")!.value};
      this.categoryService.postCategory(category).subscribe(result => {
        this.dialogRef.close();
        this.updatedCategory.emit();
      });
    }
  }

  setColor(event: any){
    this.categoryForm.setValue({
      category: this.categoryForm.get("category")!.value,
      color: event.color.hex
    });
  }

}
