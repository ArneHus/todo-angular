import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

//Material
import { MatMenuModule } from '@angular/material/menu';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorCircleModule } from 'ngx-color/circle';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';

// Pipes
import { TodoCountPipe } from '../pipes/todo-count.pipe';
import { TotalCountPipe } from '../pipes/total-count.pipe';
import { TotalImportantCountPipe } from '../pipes/total-important-count.pipe';
import { TotalThisWeekCountPipe } from '../pipes/total-this-week-count.pipe';
import { FilterListsByCategoryPipe } from '../pipes/filter-lists-by-category.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { NewCategoryDialogComponent } from './new-category-dialog/new-category-dialog.component';
import { AskConformationDialogComponent } from './ask-conformation-dialog/ask-conformation-dialog.component';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListComponent,
    TaskComponent,
    TodoCountPipe,
    TotalCountPipe,
    TotalImportantCountPipe,
    TotalThisWeekCountPipe,
    FilterListsByCategoryPipe,
    NewCategoryDialogComponent,
    AskConformationDialogComponent,
    NewListDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgxMatColorPickerModule,
    MatDialogModule,
    ColorCircleModule,
    MatCheckboxModule
  ],
  entryComponents: [
    NewCategoryDialogComponent
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
