import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  // url: string = "http://localhost:3000";
  url: string = "https://todo-angular.loca.lt";

  constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.url + "/lists?_embed=todo");
  }

  getListById(id: number): Observable<List> {
    return this.httpClient.get<List>(this.url + "/lists/" + id + "?_embed=todo");
  }

  getListsFromCategory(categoryID: number): Observable<List[]> {
    return this.httpClient.get<List[]>(this.url + "/lists?categoryId=" + categoryID + "&_embed=todo");
  }

  postList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>(this.url + "/lists", list, {headers: headers});
  }

  putList(id:number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<List>(this.url + "/lists/" + id, list, {headers: headers});
  }

  deleteList(id: number): Observable<List> {
    return this.httpClient.delete<List>(this.url + "/lists/" + id);
  }
}
