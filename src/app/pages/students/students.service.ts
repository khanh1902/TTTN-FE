import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Params } from 'src/app/shared/models/params';
import { Pagination } from 'src/app/shared/models/pagination';
import { Response } from 'src/app/shared/models/response';
import { BASE_URL } from 'src/app/shared/constants';
import { Student } from 'src/app/shared/models/student';
import { Observable } from 'rxjs';
import { Class } from 'src/app/shared/models/class';
import { StudentDTO } from 'src/app/shared/dtos/studentDTO';



@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getStudents(studentParams: Params) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    let params = new HttpParams();
    params = params.append('offset', studentParams.offset);
    params = params.append('limit', studentParams.limit);
    if (studentParams.search) params = params.append('search', studentParams.search);
    const option = {
      headers: headers,
      params: params,
    }
    return this.http.get<Response<Pagination<Student[]>>>(this.baseUrl + `student`, option);
  }

  getStudentById(id: string | number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    if (id !== null) {
      return this.http.get<Response<Student[]>>(this.baseUrl + 'student/' + id, { headers })
    }
    return;
  }

  addStudent(studentData: StudentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }
    return this.http.post(this.baseUrl + 'student', studentData, option);
  }

  updateStudent(id: string | null, studentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }

    return this.http.put(this.baseUrl + 'student/' + id, studentData, option);
  }

  getClass(classParams: Params) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });


    let params = new HttpParams();
    params = params.append('offset', classParams.offset);
    params = params.append('limit', 100);
    if (classParams.search) params = params.append('search', classParams.search);

    const option = {
      headers: headers,
      params: params
    }
    return this.http.get<Response<Pagination<Class[]>>>(this.baseUrl + `class`, option);
  }

  deleteStudents(ids: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }

    let idsStudent = '';
    for (let i = 0; i < ids.length; i++) {
      idsStudent += ids[i];
      if (i < ids.length - 1) {
        idsStudent += '&ids=';
      }
    }
    // Make a DELETE request to the Spring Boot API endpoint
    return this.http.delete(this.baseUrl + `student?ids=${idsStudent}`, option);
  }

  exportPDFListStudent() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'student/export/pdf/all', { headers: headers, responseType: 'arraybuffer' });
  }

  exportExcelListStudent() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'student/export/excel/all', { headers: headers, responseType: 'arraybuffer' });
  }
}
