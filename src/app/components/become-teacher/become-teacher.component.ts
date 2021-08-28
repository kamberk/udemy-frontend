import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-become-teacher',
  templateUrl: './become-teacher.component.html',
  styleUrls: ['./become-teacher.component.css']
})
export class BecomeTeacherComponent implements OnInit {

  FormData!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private contact: ContactService
  ) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Comment: new FormControl('', [Validators.required])
      })
  }

  onSubmit(FormData: any) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    }

}
