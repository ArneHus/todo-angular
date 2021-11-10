import { Injectable } from '@angular/core';
import { Task } from './task';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>("http://localhost:3000/todo");
  }

  getTasksByList(id:number): Observable<Task[]> {
    return this.httpClient.get<Task[]>("http://localhost:3000/todo?listId=" + id);
  }

  putTask(id:number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>("http://localhost:3000/todo/" + id, task, {headers: headers});
  }

  postTask(task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Task>("http://localhost:3000/todo", task, {headers: headers});
  }

  deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>("http://localhost:3000/todo/" + id);
  }

}
