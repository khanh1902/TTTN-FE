import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from 'src/app/shared/models/params';
import { Pagination } from 'src/app/shared/models/pagination';
import { IStudent } from 'src/app/shared/models/student';
import { Response } from 'src/app/shared/models/response';
import { BASE_URL } from 'src/app/shared/constants';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getStudents(studentParams: Params) {
    let params = new HttpParams();
    params = params.append('pageIndex', studentParams.pageIndex);
    params = params.append('pageSize', studentParams.pageSize);
    if(studentParams.search) params = params.append('search', studentParams.search);
    return this.http.get<Response<Pagination<IStudent[]>>>(this.baseUrl + `student`, { params });
  }
}
