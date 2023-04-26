import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { BookComponent } from './Books/book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { BookDetailsComponent } from './Books/book-details/book-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Auth/login/login.component';
import { AuthService } from './Services/auth/auth.service';
import { UserInterceptor } from './Services/Interceptors/user.interceptor';
import { AdminModule } from './admin/admin.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    PageNotFoundComponent,
    BookDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    AdminModule,
    MatSnackBarModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
