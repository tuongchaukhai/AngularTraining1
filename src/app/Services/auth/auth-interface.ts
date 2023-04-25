import { Observable } from "rxjs";
import { LoginViewModel } from "src/app/ViewModels/login.model";

export interface IAuthService {
     login(login: LoginViewModel): Observable<any>;
     
  }