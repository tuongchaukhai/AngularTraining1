import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { LoginViewModel } from 'src/app/ViewModels/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(15)]]
  });

  constructor(private fb: FormBuilder, private service: AuthService) { }

  onSubmit(): void {
    const loginData: LoginViewModel = {
      email: this.formLogin.value.email || "",
      password: this.formLogin.value.password || ""
    };
    this.service.login(loginData).subscribe(
      respone => {
        if (respone.success) {
          debugger
          localStorage.setItem('token', respone.data.accessToken);
          console.log(respone.data.accessToken);
          console.log(respone.message);
        } else {
          console.log(respone.message);
        }
      },
      err => {
        console.log(err);
      });
  }
}

