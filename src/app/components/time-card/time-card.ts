import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Record {
  data: string;
  schedules: {
    entryTime?: string;
    startLunch?: string;
    endLunch?: string;
    departureTime?: string;
  };
}

type Status = 'Completo' | 'Sem Registro' | 'Editado' | 'Inválido';

@Component({
  selector: 'app-time-card',
  imports: [],
  templateUrl: './time-card.html',
  styleUrl: './time-card.scss',
})
export class TimeCard {
  @Input() record: Record = {
      data: '01/10/2025',
      schedules: {
        entryTime: '07:00',
        startLunch: '12:00',
        endLunch: '13:00',
        departureTime: '15:00',
      },
    };


}
