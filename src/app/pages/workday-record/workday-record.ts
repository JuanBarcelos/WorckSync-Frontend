import { Component, inject } from '@angular/core';
import { TimeCard, type RecordStatus } from '../../components/time-card/time-card';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { FilterModal } from '../../components/shared/filter-modal/filter-modal';
import { TimeRecordsService } from '../../services/time-records';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { switchMap, take } from 'rxjs';
import type { ITimeRecords } from '../../interfaces/timeRecords';
import {
  calculateTotalHours,
  calculateTotalOvertimeHours,
} from '../../utils/calculate-total-hours';
import { ReportService } from '../../services/report';
import { LoadingService } from '../../services/loading';
import type { IReportRequest } from '../../interfaces/report';
import { LoadingModal } from '../../components/shared/loading-modal/loading-modal';
import { UploadFileService } from '../../services/upload-file';
import type { IProcessSingleDayRequest } from '../../interfaces/process';
import { NotificationService } from '../../services/notification';

dayjs.extend(duration);

@Component({
  selector: 'app-workday-record',
  imports: [TimeCard, SecondaryButton, PrimaryButton, FilterModal, LoadingModal],
  templateUrl: './workday-record.html',
  styleUrl: './workday-record.scss',
})
export class WorkdayRecord {
  private readonly _timeRecordService = inject(TimeRecordsService);
  private readonly _reportService = inject(ReportService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _uploadService = inject(UploadFileService);
  private readonly _notificationService = inject(NotificationService);

  timeRecords: ITimeRecords[] = [];
  showModal = false;
  filters: any = null;
  diasNoMesAtual = dayjs().daysInMonth();

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleApplyFilters(filters: any) {
    this.filters = filters;

    this._timeRecordService
      .getTimeRecordsByEmployer(filters.employerId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.timeRecords = response;

          if (filters.status && filters.status.length > 0) {
            this.timeRecords = this.timeRecords.filter((record) => {
              const recordStatus = this.getRecordStatus(record);
              return filters.status.includes(recordStatus);
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.showModal = false;
  }

  handleDownloadReport(employerID: string, employerName: string) {
    this._loadingService.start('Gerando relatório...');
    const data: IReportRequest = {
      type: 'MONTHLY_SUMMARY',
      format: 'EXCEL', // ou 'EXCEL'
      month: dayjs().month() + 1,
      year: dayjs().year(),
      employeeId: employerID,
    };

    this._reportService
      .generateReport(data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.downloadFile(response.reportId, employerName);
          this._loadingService.finish('Relatório gerado com sucesso!');
        },
        error: () => {
          this._loadingService.finish('Erro ao gerar relatório!');
        },
      });
  }

  onRecordUpdated(timeRecord: ITimeRecords) {
    this._timeRecordService
      .updateTimeRecord(timeRecord)
      .pipe(
        take(1),
        // quando salvar o registro → chamar o processamento do dia
        switchMap((response) => {
          // 1. Atualiza a lista local
          this.timeRecords = this.timeRecords.map((record) =>
            record.id === response.id ? response : record
          );

          // 2. Prepara o body para processar o dia
          const data: IProcessSingleDayRequest = {
            date: timeRecord.date,
            employeeId: this.filters.employerId,
            generateOccurrences: false,
            updateExisting: true,
          };

          // 3. Retorna o observable da segunda requisição
          return this._uploadService.processSingleDay(data);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Dia processado com sucesso!', response);
        },
        error: (err) => {
          console.error('Erro ao atualizar ou processar o registro', err);
        },
      });
  }

  totalWorkedHours(records: ITimeRecords[]) {
    return calculateTotalHours(records);
  }

  totalOvertimeMinutes(records: ITimeRecords[]) {
    return calculateTotalOvertimeHours(records);
  }

  getRecordStatus(record: ITimeRecords): RecordStatus {
    const allFields = [record.clockIn1, record.clockOut1, record.clockIn2, record.clockOut2];

    const filledCount = allFields.filter(Boolean).length;

    if (filledCount === 4) return 'Completo';
    if (filledCount === 0) return 'Sem Registro';
    return 'Incompleto';
  }

  private downloadFile(reportID: string, employerName: string) {
    this._reportService
      .downloadReport(reportID)
      .pipe(take(1))
      .subscribe({
        next: (arquivo: Blob) => {
          let filename = `${employerName}-relatorio-mensal`;

          const contentDisposition = this._reportService.lastContentDisposition;

          if (contentDisposition && contentDisposition.includes('filename=')) {
            filename = contentDisposition.split('filename=')[1].trim().replace(/"/g, '');
          } else {
            const mime = arquivo.type;

            if (mime === 'application/pdf') filename += '.pdf';
            else if (mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
              filename += '.xlsx';
            else if (mime === 'text/csv') filename += '.csv';
            else filename += '.bin';
          }

          const url = window.URL.createObjectURL(arquivo);

          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.style.display = 'none';

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
