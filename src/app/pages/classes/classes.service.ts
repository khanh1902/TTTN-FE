import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClass } from 'src/app/shared/models/class';
import { Params } from 'src/app/shared/models/params';
import { Pagination } from 'src/app/shared/models/pagination';
import { Response } from 'src/app/shared/models/response';
import { BASE_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getClass(classParams: Params) {
    let params = new HttpParams();
    params = params.append('pageIndex', classParams.pageIndex);
    params = params.append('pageSize', classParams.pageSize);
    return this.http.get<Response<Pagination<IClass[]>>>(this.baseUrl + `class`, { params });
  }
}
