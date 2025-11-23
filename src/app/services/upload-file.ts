import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ImportResponse } from '../interfaces/upload-success-response';
import type { Observable } from 'rxjs';
import type { IProcess, IProcessSingleDayRequest, IProcessSingleDayResponse } from '../interfaces/process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly _httpClient = inject(HttpClient);

  upload(file: File): Observable<ImportResponse>{
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._httpClient.post<ImportResponse>(environment.apiURL + '/imports/upload', formData)
  };

  process(id:string): Observable<IProcess>{
    return this._httpClient.post<IProcess>(environment.apiURL + `/imports/${id}/process`,{});
  }

  processSingleDay(data: IProcessSingleDayRequest): Observable<IProcessSingleDayResponse> {
     return this._httpClient.post<IProcessSingleDayResponse>(environment.apiURL + `/processing/single-day`, data);
  }
}
