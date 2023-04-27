import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() {}

  public handleError(error: any): Observable<any> {
    debugger
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}