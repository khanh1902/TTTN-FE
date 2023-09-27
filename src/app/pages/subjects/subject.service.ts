import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants';
import { Pagination } from 'src/app/shared/models/pagination';
import { Params } from 'src/app/shared/models/params';
import { Response } from 'src/app/shared/models/response';
import { ISubject } from 'src/app/shared/models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getSubject(subjectParams: Params) {
    let params = new HttpParams();
    params = params.append('pageIndex', subjectParams.pageIndex);
    params = params.append('pageSize', subjectParams.pageSize);
    return this.http.get<Response<Pagination<ISubject[]>>>(this.baseUrl + `subject`, { params });
  }
}
