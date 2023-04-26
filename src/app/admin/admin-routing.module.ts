import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from '../Books/book-create/book-create.component';
import { BookUpdateComponent } from '../Books/book-update/book-update.component';

const routes: Routes = [
  { path: 'books/create', component: BookCreateComponent },
  { path: 'books/update/:id', component: BookUpdateComponent }
  // { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'staff'] } },
  // { path: 'books/update/:id', component: BookUpdateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'staff'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
