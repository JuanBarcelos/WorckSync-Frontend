import { HttpClient, type HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { IReportRequest, IReportResponse } from '../interfaces/report';
import { map, tap, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly _httpClient = inject(HttpClient);
  lastContentDisposition: string | null = null;

  generateReport(data: IReportRequest): Observable<IReportResponse> {
    return this._httpClient.post<IReportResponse>(
      environment.apiURL + '/reports/monthly',
      data
    );
  }

  downloadReport(reportID: string): Observable<Blob> {
    return this._httpClient
      .get(environment.apiURL + `/reports/${reportID}/download`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<Blob>) => {
          this.lastContentDisposition = response.headers.get('Content-Disposition') || null;
        }),
        map((response) => response.body as Blob)
      );
  }
}
