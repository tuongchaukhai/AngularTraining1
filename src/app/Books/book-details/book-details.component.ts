import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})

export class BookDetailsComponent {
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router) { }
  public bookShow: Book[] = [];
  public id: any;


  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id'); //snapshot lấy giá trị tham số trên URL (VD: /details/5 => lấy 5) *Phải khai báo param ở routes trong routing module.
    this.httpService.get(this.id).subscribe(x => {
      this.bookShow = x;
    }
    );
  }

  routeToUpdate(): void {
    this.router.navigate(['books/update', this.bookShow[0].id]);
  }

  deleteBook(id: any): void {
    if (window.confirm('Chắc chắn xóa?')) {
      this.httpService.delete(id).subscribe(data => {
        if (data == null) {
          alert('thành công');
          this.router.navigate(['books']);
        }
      },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 404) { alert('Thất bại'); }
          }
        });
    }
  }
}

