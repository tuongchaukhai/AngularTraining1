import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  public formData: FormGroup;
  
  constructor(private fb: FormBuilder, private httpService: HttpServiceService, private router: Router) {
    this.formData = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      ibsn: ['', [Validators.pattern(/^\d+$/)]]
    });
  }

  formReset(): void {
    this.formData.reset();
  }

  formSubmit(): void {
    debugger
    this.httpService.post(this.formData.value).subscribe(x=>{
      if(x)
      {
        alert('thành công');
        this.router.navigate(['books']);
      }
      else
      {
        alert('không thành công');
      }
    });
  }

  

}
