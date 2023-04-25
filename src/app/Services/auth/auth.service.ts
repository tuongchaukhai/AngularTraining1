import { Injectable } from '@angular/core';
import { IAuthService } from './auth-interface';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel } from 'src/app/ViewModels/login.model';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private url = 'https://localhost:7263/api/auth';
  
  constructor(private http: HttpClient) { }

  login(request: LoginViewModel): Observable<any> {
      return this.http.post<any>(`${this.url}`, request);
  }
}
