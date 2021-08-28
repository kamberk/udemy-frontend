import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ApprooveComponent } from './components/approove/approove.component';
import { BecomeTeacherComponent } from './components/become-teacher/become-teacher.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { CourseDetalisComponent } from './components/course-detalis/course-detalis.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { PayComponent } from './components/pay/pay.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RememberCodeComponent } from './components/remember-code/remember-code.component';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component';
import { SignupComponent } from './components/signup/signup.component';
import { StartCourseComponent } from './components/start-course/start-course.component';
import { ThankYouContactComponent } from './components/thank-you-contact/thank-you-contact.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { UpdateComponent } from './components/update/update.component';
import { WebDesignComponent } from './components/web-design/web-design.component';
import { GraphicDesignComponent } from './graphic-design/graphic-design.component';
import { ProgrammingComponent } from './programming/programming.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'remember-code', component: RememberCodeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'restart-password', component: RestartPassComponent},
  {path: 'create-course', component: CreateCourseComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'my-courses', component: MyCoursesComponent},
  {path: 'course-details', component: CourseDetalisComponent},
  {path: 'pay', component: PayComponent},
  {path: 'web-design', component: WebDesignComponent},
  {path: 'course-page', component: StartCourseComponent},
  {path: 'thank-you', component: ThankYouComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'thank-you-for-contact', component: ThankYouContactComponent},
  {path: 'approove', component: ApprooveComponent, data: {title: 'Change user role', toolbar: false}},
  {path: 'programming', component: ProgrammingComponent},
  {path: 'graphic-design', component: GraphicDesignComponent},
  {path: 'become-a-teacher', component: BecomeTeacherComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'search', component: SearchComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
