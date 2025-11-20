export interface IProcess {
  status: string;
  processed: number;
  failed: number;
  skipped: number;
  occurrencesGenerated: number;
  calculationsPerformed: number,
  total: number;
  message: string;
  settings: {
    autoCalculate: boolean,
    generateOccurrences: boolean,
    message: string;
  }
}
