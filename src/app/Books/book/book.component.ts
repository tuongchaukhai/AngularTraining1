import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

'@angular/forms';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent {
  public books?: Book[];
  public search: string = '';
  public searchBy: string = 'title';
  public page: number | undefined;
  public isAdmin: boolean = false;
  constructor(private httpService: HttpServiceService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private dialog: MatDialog) { 
    this.authService.user.subscribe(user => {
      if(user?.role.toString() == 'admin' || user?.role.toString() == 'staff')
      {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
    })
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'] || '1', 10)
    });
    this.showBooks(this.page);

  }

  showBooks(page: number = 1): void {

    this.httpService.getAll(page).subscribe(books => this.books = books);
  }

  goToDetails(book: Book): void {
    // this.router.navigate(['/details', book.id]);
    this.router.navigate(['books/details'], { queryParams: { id: book.id } }); // /details?id={id}
  }

  createBookRoute(): void {
    this.router.navigate(['admin/books/create']);
  }

  routeToUpdate(id: any): void {
    debugger
    this.router.navigate(['admin/books/update', id]);
  }

  searchBook(search: string, searchBy: string): void {
    debugger
    this.httpService.search(search, searchBy).subscribe(book => this.books = book);
  }

  // deleteBook(id: any): void {
  //   debugger
  //   if (window.confirm('Chắc chắn xóa?')) {
  //     this.httpService.delete(id).subscribe(data => {
  //       if (data == null) {
  //         alert('thành công');
  //         this.showBooks();
  //       }
  //     },
  //       error => {
  //         if (error instanceof HttpErrorResponse) {
  //           if (error.status == 404) { alert('Thất bại'); }
  //         }
  //       });
  //   }
  // }

  // isAdmin(): boolean {
  //   const role = this.authService.userRole;
  //   if ((['admin', 'staff'].includes(role)))
  //     return true;
  //   return false;
  // }

  openDialogDelete(bookId: number)
  {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { bookId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpService.delete(bookId).subscribe(data => {
          if (data == null) {
            alert('success');
            this.showBooks();
          }
        },
          error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status == 404) { alert('failed'); }
            }
          });
      }
    });
  }
}
