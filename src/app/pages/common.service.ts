import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../shared/constants';
import { Response } from '../shared/models/response';
import { Class } from '../shared/models/class';
import { Student } from '../shared/models/student';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getClassesNotYetRegisterSubject(subjectId:number | null) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }
    return this.http.get<Response<Class[]>>(this.baseUrl + `class/not-yet-register?subjectId=${subjectId}`, option);
  }

  getStudentsNotYetRegisterSubject(subjectId:number | null) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }

    return this.http.get<Response<Student[]>>(this.baseUrl + `student/not-yet-register?subjectId=${subjectId}`, option);
  }
}
