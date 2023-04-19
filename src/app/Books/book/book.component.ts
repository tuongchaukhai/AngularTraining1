import { Component } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  public books?:  Book[];

  constructor(private httpService : HttpServiceService) {}

  ngOnInit() {
    console.log("test");
    this.showBooks();

  }

  showBooks(): void {
    
    this.httpService.getAll().subscribe(books => this.books = books);
  }
}
