import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router: Router, private errorHandle: ErrorHandlingService) { }

  private url = 'https://localhost:7263/api/books';

  getAll(page: number = 1): Observable<any> {
    let url = `${this.url}?page=${page}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  search(search: any, searchBy: string, page: number = 1): Observable<any> {
    if (search.Length > 0)
      return this.getAll();
    if (searchBy === "title")
      return this.http.get<any>(`${this.url}?title=${search}&page=${page}`);
    else
      return this.http.get<any>(`${this.url}?author=${search}&page=${page}`);
  }

  post(book: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, book);
  }

  put(book: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, book);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, id);
  }
}
