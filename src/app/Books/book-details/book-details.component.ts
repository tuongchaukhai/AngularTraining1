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
  public title: any;
  public author: any;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const title = params['title'];
      const author = params['author'];
      this.httpService.get(id, title, author).subscribe(x => {
        this.bookShow = x;
      });
    }
    );
  }

  routeToUpdate(): void {
    this.router.navigate(['books/update', this.bookShow[0].id]);
  }

  deleteBook(): void {
    debugger
    if (window.confirm('Chắc chắn xóa?')) {
      this.httpService.delete(this.bookShow[0].id).subscribe(data => {
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

