import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from 'src/app/shared/models/params';
import { Pagination } from 'src/app/shared/models/pagination';
import { Response } from 'src/app/shared/models/response';
import { BASE_URL } from 'src/app/shared/constants';
import { Class } from 'src/app/shared/models/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getClass(classParams: Params) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let params = new HttpParams();
    params = params.append('offset', classParams.offset);
    params = params.append('limit', classParams.limit);
    if(classParams.search) params = params.append('search', classParams.search);

    const option = {
      headers: headers,
      params: params
    }
    
    return this.http.get<Response<Pagination<Class[]>>>(this.baseUrl + `class`, option);
  }

  addClass(classData: Class): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }

    return this.http.post(this.baseUrl + 'class', classData, option);
  }

  updateClass(id: number | null, classData: Class): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }
    return this.http.put(this.baseUrl + 'class/' + id, classData, option);
  }

  deleteClasses(ids: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }

    let idsStudent = '';
    for (let i = 0; i < ids.length; i++) {
      idsStudent += ids[i] + '&ids=';
    }
    // Make a DELETE request to the Spring Boot API endpoint
    return this.http.delete(this.baseUrl + `class?ids=${idsStudent}`, option);
  }

  exportPDFClass(className: string | null) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'class/export/pdf?className=' + className, { headers: headers, responseType: 'arraybuffer' });
  }

  exportExcelClass(className: string | null) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'class/export/excel?className=' + className, { headers: headers, responseType: 'arraybuffer' });
  }
}
