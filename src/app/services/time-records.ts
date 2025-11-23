import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { ITimeRecords } from '../interfaces/timeRecords';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordsService {
  private readonly _httpClient = inject(HttpClient);

  getTimeRecordsByEmployer(employeeId: string): Observable<ITimeRecords[]> {
    return this._httpClient.get<ITimeRecords[]>(environment.apiURL + `/timerecords/${employeeId}`)
  }

  updateTimeRecord(timeRecord: ITimeRecords): Observable<ITimeRecords> {
    return this._httpClient.put<ITimeRecords>(environment.apiURL + `/timerecords/update`, timeRecord)
  }
}
