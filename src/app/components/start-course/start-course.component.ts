import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-start-course',
  templateUrl: './start-course.component.html',
  styleUrls: ['./start-course.component.css'],
  providers: [NgbRatingConfig],
    styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class StartCourseComponent implements OnInit {

  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('Authorization', `Bearer ${this.token}`)
  .set('Content-Type', 'application/json');

  rating =3;
  id: any;
  course: any;
  Link: any;
  link: any;
  videoUrl: any;

  ratingForm = this.formBuilder.group({
    rating: ''
  })

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private http: HttpClient,
    config: NgbRatingConfig
  ) { 
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit(): void {
    this.id = this.courseService.getID();
    this.courseService.getCourseById(this.id).subscribe(
      (res: any) => {
        console.log(res.course.Course);
        this.course = res.course.Course;
        this.Link = this.course.Link;
        // console.log(this.link)
        var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
         var match = this.Link.match(regExp);
         const ID = (match && match[1].length == 11) ? match[1] : false;
         this.link = 'https://www.youtube.com/embed/' + ID;
         this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
         console.log(ID);
         console.log(this.videoUrl)
      },
      err => {
        console.log(err);
      }
    )
  }

  Clicked() {
    console.log("Rating with: " + this.rating)
    this.ratingForm.setValue({rating: this.rating})
    this.http.post('http://64.227.98.119/api/courses/student/rate/' + this.id, JSON.stringify(this.ratingForm.value), {'headers': this.headers}).subscribe(
      res => {
        console.log(res)
        this._snackbar.open('Course rated!', 'Close!')
      },
      err => {
        console.log(err)
      }
    )
  }


}
