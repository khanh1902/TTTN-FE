import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/constants';
import { Pagination } from 'src/app/shared/models/pagination';
import { Params } from 'src/app/shared/models/params';
import { Response } from 'src/app/shared/models/response';
import { AddSubjectByClass, AddSubjectByStudent, Subject } from 'src/app/shared/models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public baseUrl = BASE_URL + 'subject';
  constructor(private http: HttpClient) { }

  getSubject(subjectParams: Params) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });


    let params = new HttpParams();
    params = params.append('offset', subjectParams.offset);
    params = params.append('limit', subjectParams.limit);
    if (subjectParams.search) params = params.append('search', subjectParams.search);

    const option = {
      headers: headers,
      params: params
    }

    return this.http.get<Response<Pagination<Subject[]>>>(this.baseUrl, option);
  }

  addSubject(subjectData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }
    return this.http.post(this.baseUrl, subjectData, option);
  }

  updateSubject(id: number | null, subjectData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }
    return this.http.put(this.baseUrl + `/${id}`, subjectData, option);
  }

  deleteSubjects(ids: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }

    let idsSubject = '';
    for (let i = 0; i < ids.length; i++) {
      idsSubject += ids[i];
      if (i < ids.length - 1) {
        idsSubject += '&ids=';
      }
    }
    return this.http.delete(this.baseUrl + `?ids=${idsSubject}`, option);
  }

  addSubjectForClass(id: number | null, classId: AddSubjectByClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }

    return this.http.post<Response<Subject[]>>(this.baseUrl + `/${id}/add-class`, classId, option);
  }

  addSubjectForStudent(id: number | null, studentIds: AddSubjectByStudent): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(localStorage.getItem('token'));

    const option = {
      headers: headers,
    }

    return this.http.post<Response<Subject[]>>(this.baseUrl + `/${id}/add-student`,studentIds, option);
  }
}
