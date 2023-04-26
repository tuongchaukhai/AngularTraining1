import { Observable } from "rxjs";
import { LoginViewModel } from "src/app/ViewModels/login.model";

export interface IAuthService {
   logIn(login: LoginViewModel): Observable<any>;

   logOut(): void;

   isLoggedIn(): boolean;

   setToken(token: string): void;

}