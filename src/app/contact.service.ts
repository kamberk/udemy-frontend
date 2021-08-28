import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api = 'https://mailthis.to/kambo'

  constructor(
    private http: HttpClient
  ) { }

    PostMessage(input: any) {
      return this.http.post(this.api, input, {responseType: 'text'})
      // .subscribe(
      // (res) => {
      //   return res
      // },
      // err => {
      //   return err
      // }
      // )
    }

}
