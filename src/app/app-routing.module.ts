import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Books/book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookDetailsComponent } from './Books/book-details/book-details.component';

const routes: Routes = [
  { path: 'books', component: BookComponent },
  { path: 'details', component: BookDetailsComponent },
  { path: '*', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
