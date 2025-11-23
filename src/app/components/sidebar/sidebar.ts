import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReportService } from '../../services/report';
import { take } from 'rxjs';
import { LoadingService } from '../../services/loading';
import dayjs from 'dayjs';
import type { IReportRequest } from '../../interfaces/report';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly _reportService = inject(ReportService);
  private readonly _loadingService = inject(LoadingService);

  private downloadFile(reportID: string) {
    this._reportService
      .downloadReport(reportID)
      .pipe(take(1))
      .subscribe({
        next: (arquivo: Blob) => {
          let filename = `relatorio-mensal-geral`;

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

  handleDownloadReport() {
    this._loadingService.start('Gerando relatório...');
    const data: IReportRequest = {
      type: 'MONTHLY_SUMMARY',
      format: 'EXCEL', // ou 'EXCEL'
      month: dayjs().month() + 1,
      year: dayjs().year(),
    };

    this._reportService
      .generateReport(data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.downloadFile(response.reportId);
          this._loadingService.finish('Relatório gerado com sucesso!');
        },
        error: () => {
          this._loadingService.finish('Erro ao gerar relatório!');
        },
      });
  }
}
