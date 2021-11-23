import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from '../../list/list';
import { ListService } from '../../list/list.service';

@Component({
  selector: 'app-new-list-dialog',
  templateUrl: './new-list-dialog.component.html',
  styleUrls: ['./new-list-dialog.component.scss']
})
export class NewListDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { categoryId: number, list: List }, private listService: ListService, public dialogRef: MatDialogRef<NewListDialogComponent>) { }

  @Output()
  updatedList: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (typeof this.data.list !== 'undefined') {
      this.listForm.setValue({
        list: this.data.list.name
      });
    }
  }

  listForm = new FormGroup({
    list: new FormControl('')
  });

  onSubmit(){
    if (typeof this.data.list !== 'undefined'){
      this.data.list.name = this.listForm.get("list")!.value
      this.listService.putList(this.data.list.id, this.data.list).subscribe(result => {
        this.dialogRef.close();
        this.updatedList.emit();
      });
    } else {
      const list: List = {id: 0, name: this.listForm.get("list")!.value, todo: [], categoryId: this.data.categoryId};
      this.listService.postList(list).subscribe(result => {
        this.dialogRef.close();
        this.updatedList.emit();
      });
    }
  }

}
