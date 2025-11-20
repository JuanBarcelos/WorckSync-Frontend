import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ImportResponse } from '../interfaces/upload-success-response';
import type { Observable } from 'rxjs';
import type { IProcess } from '../interfaces/process';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly _httpClient = inject(HttpClient);

  upload(file: File): Observable<ImportResponse>{
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._httpClient.post<ImportResponse>('http://localhost:3333/api/imports/upload', formData)
  };
  
  process(id:string): Observable<IProcess>{
    return this._httpClient.post<IProcess>(`http://localhost:3333/api/imports/${id}/process`,{});
  }
}
