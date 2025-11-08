import type { IMeta } from "./meta-interface";
import type { IShift } from "./shift";

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
  shift: IShift;
}

export interface IEmployerSuccessResponse {
  data: IEmployee[];
  meta: IMeta;
}
