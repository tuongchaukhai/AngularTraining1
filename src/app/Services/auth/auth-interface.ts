import { Observable } from "rxjs";
import { LoginViewModel } from "src/app/ViewModels/login.model";
import { RegisterDto } from "src/app/ViewModels/registerDto";

export interface IAuthService {
   logIn(login: LoginViewModel): Observable<any>;

   logOut(): void;

   isLoggedIn(): boolean;

   setToken(token: string): void;

   register(dto: RegisterDto): Observable<any>;

}