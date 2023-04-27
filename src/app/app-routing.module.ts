import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Books/book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookDetailsComponent } from './Books/book-details/book-details.component';
import { BookCreateComponent } from './Books/book-create/book-create.component';
import { BookUpdateComponent } from './Books/book-update/book-update.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './Auth/register/register.component';


const routes: Routes = [
  { path: '', component: BookComponent },
  { path: 'books', component: BookComponent },
  { path: 'books/details', component: BookDetailsComponent },

  // { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'staff'] } },
  // { path: 'books/update/:id', component: BookUpdateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'staff'] } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
