import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent {
  public formData: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private httpService: HttpServiceService, private router: Router) {
    this.formData = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      ibsn: ['', [Validators.pattern(/^\d+$/)]]
    });
  }

  public id : any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  };

  formReset() {
    this.formData.reset();
  }

  formSubmit() {
      this.httpService.put(this.formData.value, this.id).subscribe(
      data => {
      if(data == null)  //NoContent()
      {
        alert('thành công');
        this.router.navigate(['/books']);
      }
    },
    error => {
      if(error instanceof HttpErrorResponse)
      {
        if(error.status === 404) //NotFound()
        {
          alert('không thành công');
        }
      }
    });
  }
}

