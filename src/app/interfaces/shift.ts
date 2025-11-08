import type { IMeta } from "./meta-interface";

export interface IShift{
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  workDays: number[]; // ou number[] se o backend enviar array real
  toleranceMinutes: number;
  overtimeAllowed: boolean;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: ICountEmployees;
  employeeCount: number;
}

export interface ICountEmployees {
  employees: number;
}

export interface IShiftSuccessResponse {
  data: IShift[];
  meta: IMeta;
}
