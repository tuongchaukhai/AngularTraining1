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
    this.authservice.user.subscribe(user => {
      if(user != null){
        this.isLogged = true;
    }
    else { 
      this.isLogged = false;
  }});
  }

  logOut() : void {
    this.authservice.logOut();
  }
}
