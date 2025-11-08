import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { IShiftSuccessResponse } from '../interfaces/shift';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private readonly _httpClient = inject(HttpClient);

  getShiftAll(): Observable<IShiftSuccessResponse> {
    return this._httpClient.get<IShiftSuccessResponse>('http://localhost:3333/api/shifts');
  }
}
