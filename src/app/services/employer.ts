import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployerSuccessResponse, type INewEmployerRequest, type INewEmployerResponse } from '../interfaces/employer';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private readonly _httpClient = inject(HttpClient);

  getEmployees(): Observable<IEmployerSuccessResponse> {
    return this._httpClient.get<IEmployerSuccessResponse>(environment.apiURL + '/employees');
  }

  saveEmployer(employer: INewEmployerRequest): Observable<INewEmployerResponse>{
    return this._httpClient.post<INewEmployerResponse>(environment.apiURL + '/employees', employer);
  }

  updateEmployer(id: string, employer: INewEmployerRequest): Observable<INewEmployerResponse>{
    return this._httpClient.put<INewEmployerResponse>(environment.apiURL + `/employees/${id}`,employer)
  }

  deleteEmployer(id: string){
    return this._httpClient.delete(environment.apiURL + `/employees/${id}`)
  }

}
