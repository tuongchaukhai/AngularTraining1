import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  public handleError(error: HttpErrorResponse): void {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //server
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    alert(errorMessage);
  }
}
