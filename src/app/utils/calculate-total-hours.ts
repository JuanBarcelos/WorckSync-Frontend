import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { ITimeRecords } from '../interfaces/timeRecords';

dayjs.extend(duration);

export function calculateTotalHours(records: ITimeRecords[]): string {
  // 1. Somar todos os minutos
  const totalMinutos = records.reduce((acc, record) => acc + record.totalWorkedMinutes, 0);

  // 2. Criar uma duração com Day.js
  const hours = dayjs.duration(totalMinutos, 'minutes');

  // 3. Retornar formatado
  return `${hours.asHours().toFixed(1)}h`;
}

export function calculateTotalOvertimeHours(records: ITimeRecords[]): string {
  // 1. Somar todos os minutos
  const totalMinutos = records.reduce((acc, record) => acc + record.overtimeMinutes, 0);

  // 2. Criar uma duração com Day.js
  const hours = dayjs.duration(totalMinutos, 'minutes');

  // 3. Retornar formatado
  return `${hours.asHours().toFixed(1)}h`;
}
