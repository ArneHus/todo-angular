import { Injectable } from '@angular/core';
import { Category } from './category';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // url: string = "http://localhost:3000";
  url: string = "https://todo-angular.loca.lt";

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + "/categories?_sort=name&order=asc");
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + "/categories/" + id + "?_sort=name&order=asc");
  }

  postCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Category>(this.url + "/categories", category, {headers: headers});
  }

  putCategory(id:number, category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Category>(this.url + "/categories/" + id, category, {headers: headers});
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + "/categories/" + id);
  }
}
