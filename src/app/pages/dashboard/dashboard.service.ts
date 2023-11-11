import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants';
import { AverageScores } from 'src/app/shared/models/scores';
import { Response } from 'src/app/shared/models/response';
import { TotalDetails } from 'src/app/shared/models/totalDetails';
import { RankStudents } from 'src/app/shared/models/rankStudent';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getChartScores() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }
    return this.http.get<Response<AverageScores[]>>(this.baseUrl + `admin/dashboard/chart`, option);
  }

  getTotalsDetails() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }
    return this.http.get<Response<TotalDetails>>(this.baseUrl + `admin/dashboard/total-details`, option);
  }
  getRankStudents() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const option = {
      headers: headers,
    }
    return this.http.get<Response<RankStudents[]>>(this.baseUrl + `admin/dashboard/rank-students`, option);
  }
}
