import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { RegisterDto } from 'src/app/ViewModels/registerDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public formData = this.fb.group({
    fullname: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(15)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  formSubmit(): void {
    const registerData: RegisterDto = {
      fullname: this.formData.value.fullname || '',
      email: this.formData.value.email || '',
      password: this.formData.value.password || '',
      roleId: 2 //default customer
    }
    this.authService.register(registerData).subscribe(
      response => {
          this.snackBar.open(response, 'Close', { duration: 2000 });
          this.router.navigate(['/']);
      },
      err => {
        this.snackBar.open(err, 'Close', { duration: 2000 });
      }
    )
  }

  formReset(): void {
    this.formData.reset();
  }

}
