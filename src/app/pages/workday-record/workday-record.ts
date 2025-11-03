import { Component } from '@angular/core';
import { Record, TimeCard } from '../../components/time-card/time-card';

@Component({
  selector: 'app-workday-record',
  imports: [TimeCard],
  templateUrl: './workday-record.html',
  styleUrl: './workday-record.scss',
})
export class WorkdayRecord {
  records: Record[] = [
    {
      data: '01/10/2025',
      schedules: {
        entryTime: '07:00',
        startLunch: '12:00',
        endLunch: '13:00',
        departureTime: '15:00',
      },
    },
    {
      data: '02/10/2025',
      schedules: { entryTime: '', startLunch: '', endLunch: '', departureTime: '' },
    },
    {
      data: '03/10/2025',
      schedules: { entryTime: '07:00', startLunch: '12:00', endLunch: '13:00', departureTime: '' },
    },
  ];
}
