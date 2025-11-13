import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployerSuccessResponse, type INewEmployerRequest, type INewEmployerResponse } from '../interfaces/employer';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private readonly _httpClient = inject(HttpClient);

  getEmployees(): Observable<IEmployerSuccessResponse> {
    return this._httpClient.get<IEmployerSuccessResponse>('http://localhost:3333/api/employees');
  }

  saveEmployer(employer: INewEmployerRequest): Observable<INewEmployerResponse>{
    return this._httpClient.post<INewEmployerResponse>('http://localhost:3333/api/employees', employer);
  }

}
