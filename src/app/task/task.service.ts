import { Injectable } from '@angular/core';
import { Task } from './task';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // url: string = "http://localhost:3000";
  url: string = "https://todo-angular.loca.lt";

  constructor(private httpClient: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + "/todo");
  }

  getTasksByList(id:number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + "/todo?listId=" + id);
  }

  putTask(id:number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>(this.url + "/todo/" + id, task, {headers: headers});
  }

  postTask(task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Task>(this.url + "/todo", task, {headers: headers});
  }

  deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(this.url + "/todo/" + id);
  }

}
