export interface ImportInfo {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: any;
  startDate: string | null;
  endDate: string | null;
  processedAt: string | null;
  completedAt: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalFile: number | null;
  importadosSucesso: number | null
}

export interface ImportPreview {
  totalRecords: number;
  validRecords: number;
  errors: any[];
  warnings: any[];
  startDate: string;
  endDate: string;
  month: number;
  year: number;
  employeesFound: number;
  employees: EmployeePreview[];
  missingEmployees: any[];
  sampleData: SampleData[];
}

export interface EmployeePreview {
  id: string;
  nome: string;
  departamento: string;
  presencas: Record<string, string[]>;
}

export interface SampleData {
  sheetId: string;
  employeeName: string;
  department: string;
  date: string;
  times: string[];
  clockIn1: string;
  clockOut1: string;
  clockIn2: string;
  clockOut2: string;
}

export interface ImportResponse {
  import: ImportInfo;
  preview: ImportPreview;
}
