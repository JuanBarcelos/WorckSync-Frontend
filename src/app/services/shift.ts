import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { INewShiftRequest, INewShiftResponse, IShiftSuccessResponse } from '../interfaces/shift';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private readonly _httpClient = inject(HttpClient);

  getShiftAll(): Observable<IShiftSuccessResponse> {
    return this._httpClient.get<IShiftSuccessResponse>(environment.apiURL + '/shifts');
  }

  saveShift(shift: INewShiftRequest): Observable<INewShiftResponse> {
    return this._httpClient.post<INewShiftResponse>(environment.apiURL + '/shifts', shift);
  }

  updateShift(id: string,shift: INewShiftRequest): Observable<INewShiftResponse> {
    return this._httpClient.put<INewShiftResponse>(environment.apiURL + `/shifts/${id}`, shift);
  }

  deleteShift(id: string) {
    return this._httpClient.delete(environment.apiURL + `/shifts/${id}`);
  }

}
