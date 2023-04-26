import { Injectable } from '@angular/core';
import { IAuthService } from './auth-interface';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel } from 'src/app/ViewModels/login.model';
import { BehaviorSubject, Observable, catchError, empty, map } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Models/user';
import { ErrorHandlingService } from '../error-handling.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private url = 'https://localhost:7263/api/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private errorHandle: ErrorHandlingService, private snackBar: MatSnackBar) {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.setItem('token', token);
      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token);
      const user: User = {
        userId: decoded.Id,
        email: decoded.email,
        fullName: decoded.FullName,
        role: decoded.role
      };
      this.userSubject.next(user);
    }
  }

  // logIn(request: LoginViewModel): Observable<any> {
  //     return this.http.post<any>(`${this.url}`, request);
  // }

  logIn(request: LoginViewModel): Observable<any> {
    return this.http.post<any>(`${this.url}`, request).pipe(
      map(response => {
        if (response.success) {
          this.setToken(response.data.accessToken);
          this.snackBar.open('Login successful', 'Close', { duration: 2000 });
          return { success: true, message: 'Login successful' };
        }
        else {
          this.snackBar.open('Login failed', 'Close', { duration: 2000 });
          return { success: false, message: 'Login failed'};
        }
      }),
      catchError(error => {
        return this.errorHandle.handleError(error);
      })
    );
  }


  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  public get userRole(): string {
    const user = this.userSubject.value;
    return user ? user.role.roleName : '';
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    if (!token) {
      localStorage.removeItem('token');
      return;
    }
    else {
      localStorage.setItem('token', token);
      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token)
      const user: User = {
        userId: decoded.Id,
        email: decoded.email,
        fullName: decoded.FullName,
        role: decoded.role
      };
      this.userSubject.next(user);
    }
  }
}
