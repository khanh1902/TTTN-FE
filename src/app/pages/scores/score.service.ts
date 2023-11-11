import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/constants';
import { Pagination } from 'src/app/shared/models/pagination';
import { Params } from 'src/app/shared/models/params';
import { Response } from 'src/app/shared/models/response';
import { DeleteScoresDTO, Scores, ScoresDTO } from 'src/app/shared/models/scores';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  public baseUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  getScore(scoresParams: Params) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    let params = new HttpParams();
    params = params.append('offset', scoresParams.offset);
    params = params.append('limit', scoresParams.limit);
    if (scoresParams.search) params = params.append('search', scoresParams.search);

    const option = {
      headers: headers,
      params: params,
    }

    return this.http.get<Response<Pagination<Scores[]>>>(this.baseUrl + `scores`, option);
  }

  updateScores(studentId: string, subjectId: number, scores: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
    }
    let newScores = new ScoresDTO(scores);
    return this.http.put(this.baseUrl + 'scores' + `?studentId=${studentId}&subjectId=${subjectId}`, newScores, option);
  }

  deleteScores(listScores: DeleteScoresDTO[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    });

    const option = {
      headers: headers,
      body: listScores,
    }

    return this.http.delete(this.baseUrl + 'scores', option);
  }

  exportPDFForStudent(studentId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'scores/export/pdf/student?studentId=' + studentId, { headers: headers, responseType: 'arraybuffer' });
  }

  exportPDFForSubject(subjectId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'scores/export/pdf/subject?subjectId=' + subjectId, { headers: headers, responseType: 'arraybuffer' });
  }

  exportExcelForSubject(subjectId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(this.baseUrl + 'scores/export/excel/subject?subjectId=' + subjectId, { headers: headers, responseType: 'arraybuffer' });
  }
}