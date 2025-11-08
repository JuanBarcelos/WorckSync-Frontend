export interface IShiftSuccessResponse {
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  workDays: string; // ou number[] se o backend enviar array real
  toleranceMinutes: number;
  overtimeAllowed: boolean;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
