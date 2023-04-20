import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  private url = 'https://localhost:7263/api/books';

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
  get(id?: any, title?: any, author?: any): Observable<any> {
    debugger
    if (id != undefined)
      return this.http.get<any>(`${this.url}?id=${id}`);
    else if (title != undefined)
      return this.http.get<any>(`${this.url}?title=${title}`);
    else 
      return this.http.get<any>(`${this.url}?author=${author}`);

  }

  post(book: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, book);
  }

  put(book: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, book);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}?id=${id}`, id);
  }
}
