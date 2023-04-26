import { Component } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularTraining1';
  constructor(private authservice: AuthService){}

  logOut() : void {
    this.authservice.logOut();
  }
}
