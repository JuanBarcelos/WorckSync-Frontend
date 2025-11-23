export interface IReportResponse {
  reportId: string;
  status: string;
  fileUrl: string;
  message: string;
  summary: {
    month: number;
    year: number;
    totalEmployees: number;
  };
}

export interface IReportRequest {
  type: string;
  format: string;
  month: number;
  year: number;
  employeeId?: string;
}
