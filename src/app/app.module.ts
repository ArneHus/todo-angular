import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';

// Pipes
import { TodoCountPipe } from '../pipes/todo-count.pipe';
import { TotalCountPipe } from '../pipes/total-count.pipe';
import { TotalImportantCountPipe } from '../pipes/total-important-count.pipe';
import { TotalThisWeekCountPipe } from '../pipes/total-this-week-count.pipe'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
