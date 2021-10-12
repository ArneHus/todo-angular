import { Injectable } from '@angular/core';
import { Category } from './category';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:3000/categories?_sort=name&order=asc");
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>("http://localhost:3000/categories/" + id + "?_sort=name&order=asc");
  }
}
