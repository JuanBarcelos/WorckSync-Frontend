import type { ITimeRecords } from './timeRecords';

export interface IProcess {
  status: string;
  processed: number;
  failed: number;
  skipped: number;
  occurrencesGenerated: number;
  calculationsPerformed: number;
  total: number;
  message: string;
  settings: {
    autoCalculate: boolean;
    generateOccurrences: boolean;
    message: string;
  };
}

export interface IProcessSingleDayResponse {
  timeRecord: ITimeRecords;
  calculation: {
    totalWorkedMinutes: number;
    regularMinutes: number;
    overtimeMinutes: number;
    nightShiftMinutes: number;
    lateMinutes: number;
    earlyLeaveMinutes: number;
    missingMinutes: number;
    lunchDurationMinutes: number;
    excessiveLunchMinutes: number;
  };
  occurrences: [];
  employee: {
    id: string;
    name: string;
    shift: string;
  };
}

export interface IProcessSingleDayRequest {
  employeeId: string;
  date: string
  generateOccurrences?: boolean;
  updateExisting?: boolean;
}
