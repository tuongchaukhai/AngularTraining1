import { Component } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularTraining1';
  isLogged : boolean = false;
  constructor(private authservice: AuthService){
    this.isLogged = this.authservice.isLoggedIn();
  }

  logOut() : void {
    this.authservice.logOut();
  }
}
