import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  public books?: Book[];


  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit() {
    this.showBooks();

  }

  showBooks(): void {
    this.httpService.getAll().subscribe(books => this.books = books);
  }

  goToDetails(book: Book): void {
    // this.router.navigate(['/details', book.id]);
    this.router.navigate(['books/details'], { queryParams: { id: book.id } }); // /details?id={id}
  }

  createBookRoute(): void {
    this.router.navigate(['books/create']);
  }

  routeToUpdate(id: any): void {
    this.router.navigate(['books/update', id]);
  }

  deleteBook(id: any): void {
    debugger
    if (window.confirm('Chắc chắn xóa?')) {
      this.httpService.delete(id).subscribe(data => {
        if (data == null) {
        alert('thành công');
        this.router.navigate(['/books']);
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
