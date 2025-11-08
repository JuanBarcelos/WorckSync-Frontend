import type { IShiftSuccessResponse } from "./shift-success-response copy";

export interface IEmployee {
  id: string;
  sheetId: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  position: string;
  department: string;
  admissionDate: string;
  dismissalDate: string | null;
  isActive: boolean;
  shiftId: string;
  createdAt: string;
  updatedAt: string;
  shift: IShiftSuccessResponse;
}

export interface IMeta {
  total: number;
  pages: number;
  page: number;
  limit: number;
}


export interface IEmployerSuccessResponse {
  data: IEmployee[];
  meta: IMeta;
}
