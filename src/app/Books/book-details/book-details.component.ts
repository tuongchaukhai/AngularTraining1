import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})

export class BookDetailsComponent {
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) { }
  public bookShow?: Book[];

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id'); //snapshot lấy giá trị tham số trên URL (VD: /details/5 => lấy 5) *Phải khai báo param ở routes trong routing module.
    this.httpService.get(id).subscribe(x => {
      this.bookShow = x;
      // console.log(x);
    }
    );
  }
}

