import { Component, inject } from '@angular/core';
import { TimeCard } from '../../components/time-card/time-card';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { FilterModal } from '../../components/shared/filter-modal/filter-modal';
import { TimeRecordsService } from '../../services/time-records';
import dayjs from 'dayjs';
import { take } from 'rxjs';
import type { ITimeRecords } from '../../interfaces/timeRecords';

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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  transformRecord(record: any): {
    data: string;
    schedules: {
      entryTime?: string | null;
      startLunch?: string | null;
      endLunch?: string | null;
      departureTime?: string | null;
    };
  } {
    return {
      data: dayjs(record.date).format('DD/MM/YYYY'),
      schedules: {
        entryTime: record.clockIn1 || null,
        startLunch: record.clockOut1 || null,
        endLunch: record.clockIn2 || null,
        departureTime: record.clockOut2 || null,
      },
    };
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
}
