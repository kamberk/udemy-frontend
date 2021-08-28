import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  page = 1;
  id: any;
  courseID: any;
  
  constructor(
    private http: HttpClient
    ) { }
    
    public setPage(page: any){
      this.page = page;
    }

    public getCourses() {
       return this.http.get('http://64.227.98.119/api/courses?page=1');
    }
    
    public getCourse(){
    let courseId = localStorage.getItem('courseID');
    return this.http.get('http://64.227.98.119/api/courses/' + courseId);
  }

    public getCourseByCat(category: string) {
      return this.http.get('http://64.227.98.119/api/courses/category/' + category)
    }

    public setID(id: any) {
      this.id = id;
    }

    public setCourseID(id: any) {
      this.courseID = id;
    }

    public getCourseID() {
      return this.courseID;
    }

    public getID() {
      return this.id
    }

    public getCourseById(id: any) {
      return this.http.get('http://64.227.98.119/api/courses/' + id);
    }

}
