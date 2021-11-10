import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient } from '@angular/common/http';
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

  getListsFromCategory(categoryID: number): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists?categoryId=" + categoryID + "&_embed=todo");
  }
}
