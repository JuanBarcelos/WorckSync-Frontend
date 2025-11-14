import { Component, inject } from '@angular/core';
import { TimeCard } from '../../components/time-card/time-card';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { FilterModal } from '../../components/shared/filter-modal/filter-modal';
import { TimeRecordsService } from '../../services/time-records';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { take } from 'rxjs';
import type { ITimeRecords } from '../../interfaces/timeRecords';
import { calculateTotalHours, calculateTotalOvertimeHours } from '../../utils/calculate-total-hours';

dayjs.extend(duration);

@Component({
  selector: 'app-workday-record',
  imports: [TimeCard, SecondaryButton, PrimaryButton, FilterModal],
  templateUrl: './workday-record.html',
  styleUrl: './workday-record.scss',
})
export class WorkdayRecord {
  private readonly _timeRecordService = inject(TimeRecordsService);

  timeRecords: ITimeRecords[] = [];
  showModal = false;
  filters: any = null;
  diasNoMesAtual = dayjs().daysInMonth();

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleApplyFilters(filters: any) {
    this.filters = filters;

    this._timeRecordService
      .getTimeRecordsByEmployer(filters.employerId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.timeRecords = response;
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.showModal = false;
  }

  onRecordUpdated(timeRecord: ITimeRecords) {
    this._timeRecordService
      .updateTimeRecord(timeRecord)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          // Atualiza a lista local substituindo o registro alterado
          this.timeRecords = this.timeRecords.map((record) => (record.id === response.id ? response : record));
        },
        error: (err) => console.error('Erro ao atualizar registro', err),
      });
  }

  totalWorkedHours(records: ITimeRecords[]){
    return calculateTotalHours(records);
  }

  totalOvertimeMinutes(records: ITimeRecords[]){
    return calculateTotalOvertimeHours(records);
  }
}
