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

  updateEmployer(id: string, employer: INewEmployerRequest): Observable<INewEmployerResponse>{
    return this._httpClient.put<INewEmployerResponse>(`http://localhost:3333/api/employees/${id}`,employer)
  }

  deleteEmployer(id: string){
    return this._httpClient.delete(`http://localhost:3333/api/employees/${id}`)
  }

}
