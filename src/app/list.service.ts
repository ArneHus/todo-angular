import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists?_embed=todo");
  }

  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id + "?_embed=todo");
  }

  getListsFromCategory(categoryID: number): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists?categoryId=" + categoryID + "&_embed=todo");
  }

  postList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", list, {headers: headers});
  }

  putList(id:number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<List>("http://localhost:3000/lists/" + id, list, {headers: headers});
  }

  deleteList(id: number): Observable<List> {
    return this.httpClient.delete<List>("http://localhost:3000/lists/" + id);
  }
}
