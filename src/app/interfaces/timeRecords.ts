export interface ITimeRecords {
  id: string;
  employeeId: string;
  importId: string;
  date: string;
  dayOfWeek: number;
  clockIn1: string;
  clockOut1: string;
  clockIn2: string;
  clockOut2: string;
  clockIn3: null;
  clockOut3: null;
  totalWorkedMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number;
  nightShiftMinutes: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  absentMinutes: number;
  isHoliday: boolean;
  isWeekend: boolean;
  hasIssues: boolean;
  isManualEntry: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
