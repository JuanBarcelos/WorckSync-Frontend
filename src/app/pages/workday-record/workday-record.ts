import { Component, inject } from '@angular/core';
import { TimeCard, type TimeRecord } from '../../components/time-card/time-card';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { FilterModal } from "../../components/shared/filter-modal/filter-modal";
import { TimeRecordsService } from '../../services/time-records';

@Component({
  selector: 'app-workday-record',
  imports: [TimeCard, SecondaryButton, PrimaryButton, FilterModal],
  templateUrl: './workday-record.html',
  styleUrl: './workday-record.scss',
})
export class WorkdayRecord {
  private readonly _timeRecordService = inject(TimeRecordsService);

  timeRecords: TimeRecord[] = [];

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
    data: record.date,
    schedules: {
      entryTime: record.clockIn1 || null,
      startLunch: record.clockOut1 || null,
      endLunch: record.clockIn2 || null,
      departureTime: record.clockOut2 || null
    }
  };
}


  handleApplyFilters(filters: any){
    this.filters = filters;

    this._timeRecordService.getTimeRecordsByEmployer(filters.employerId).subscribe({
      next: (response) => {
        const formattedRecords = response.map((record: any) => this.transformRecord(record));
        this.timeRecords = formattedRecords;
      },
      error: (err) => {
        console.log(err)
      }
    });

    this.showModal = false;
  }
}
