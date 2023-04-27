import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUpdateDialogComponent } from '../confirm-update-dialog/confirm-update-dialog.component';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent {
  public formData: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private httpService: HttpServiceService, private router: Router, private dialog: MatDialog) {
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

  openDialogUpdateConfirm(bookId: number)
  {
    const dialogRef = this.dialog.open(ConfirmUpdateDialogComponent, {
      data: { bookId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpService.delete(bookId).subscribe(data => {
          if (data == null) {
            alert('success');
          }
        },
          error => {
            // if (error instanceof HttpErrorResponse) {
            //   if (error.status == 404) { alert('failed'); }
            // }
          });
      }
    });
  }
}

