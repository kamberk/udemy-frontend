import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';


import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RememberCodeComponent } from './components/remember-code/remember-code.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CookieService } from 'ngx-cookie-service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { AboutComponent } from './components/about/about.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CartComponent } from './components/cart/cart.component';
import { CourseDetalisComponent } from './components/course-detalis/course-detalis.component';
import { PayComponent } from './components/pay/pay.component';
import { WebDesignComponent } from './components/web-design/web-design.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StartCourseComponent } from './components/start-course/start-course.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { ContactComponent } from './components/contact/contact.component';
import { ThankYouContactComponent } from './components/thank-you-contact/thank-you-contact.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprooveComponent } from './components/approove/approove.component';
import { DialogComponentComponent } from './components/dialog-component/dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ProgrammingComponent } from './programming/programming.component';
import { GraphicDesignComponent } from './graphic-design/graphic-design.component';
import { BecomeTeacherComponent } from './components/become-teacher/become-teacher.component';
import { UpdateComponent } from './components/update/update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    RememberCodeComponent,
    ProfileComponent,
    EditProfileComponent,
    RestartPassComponent,
    CreateCourseComponent,
    AboutComponent,
    MyCoursesComponent,
    CartComponent,
    CourseDetalisComponent,
    PayComponent,
    WebDesignComponent,
    StartCourseComponent,
    ThankYouComponent,
    ContactComponent,
    ThankYouContactComponent,
    ApprooveComponent,
    DialogComponentComponent,
    ConfirmationDialogComponent,
    ProgrammingComponent,
    GraphicDesignComponent,
    BecomeTeacherComponent,
    UpdateComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    NgbModule,
    MatTabsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatOptionModule,
    NgxPaginationModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    NgbModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
