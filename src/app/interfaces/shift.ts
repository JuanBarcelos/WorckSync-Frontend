import type { IMeta } from './meta-interface';

export interface INewShiftRequest {
  name: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  toleranceMinutes: number;
  overtimeAllowed: boolean;
}

export interface INewShiftResponse {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  workDays: string;
  toleranceMinutes: number;
  overtimeAllowed: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string; // ou number[] se o backend enviar array real
  toleranceMinutes: number;
  overtimeAllowed: boolean;
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
