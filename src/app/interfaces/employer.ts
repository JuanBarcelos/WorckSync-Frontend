import type { IMeta } from './meta-interface';
import type { IShift } from './shift';

export interface INewEmployerRequest {
  sheetId: string;
  name: string;
  position: string;
  department: string;
  shiftId: string;
}

export interface INewEmployerResponse {
  employee: {
    id: string;
    sheetId: string;
    name: string;
    position: string;
    department: string;
    isActive: true;
    shiftId: string;
    createdAt: string;
    updatedAt: string;
    shift: IShift
  };
}

export interface IEmployee {
  id: string;
  sheetId: string;
  name: string;
  position: string;
  department: string;
  isActive: boolean;
  shiftId: string;
  createdAt: string;
  updatedAt: string;
  shift: IShift;
}

export interface IEmployerSuccessResponse {
  data: IEmployee[];
  meta: IMeta;
}
