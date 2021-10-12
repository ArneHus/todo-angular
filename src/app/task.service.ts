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

  getLists(): Observable<Task[]> {
    return this.httpClient.get<Task[]>("http://localhost:3000/todo");
  }

  putTask(id:number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>("http://localhost:3000/todo/" + id, task, {headers: headers});
}

}
