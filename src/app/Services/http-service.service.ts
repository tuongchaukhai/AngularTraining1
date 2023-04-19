import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7263/api/books/';

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
  
}
