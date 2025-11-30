import { Component, inject } from '@angular/core';
import { InputUpload } from '../../components/input-upload/input-upload';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { UploadFileService } from '../../services/upload-file';
import { ImportInfo } from '../../interfaces/upload-success-response';
import { LoadingModal } from '../../components/shared/loading-modal/loading-modal';
import { LoadingService } from '../../services/loading';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-data-import',
  imports: [InputUpload, PrimaryButton, LoadingModal],
  templateUrl: './data-import.html',
  styleUrl: './data-import.scss',
})
export class DataImport {
  private readonly _uploadFileService = inject(UploadFileService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  stats?: ImportInfo;

  onFileUploaded(file: File) {
    // 🔹 Aqui você pode integrar com o backend ou XLSX.js para leitura real
    this._uploadFileService
      .upload(file)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.stats = {
            ...response.import,
            totalFile: 1,
            importadosSucesso: 1,
          };
          this._notificationService.showSuccess(
            'O arquivo foi importado com sucesso e os registros já estão disponíveis para consulta.',
            'Folha de ponto importada'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Erro na importação');
        },
      });
  }

  onProcessFile(id: string) {
    //inicia o modal
    this._loadingService.start();
    this._uploadFileService
      .process(id)
      .pipe(
        take(1),
        finalize(() => {
          // quando terminar a requisição, com sucesso OU erro
          this._loadingService.finish();
        })
      )
      .subscribe({
        next: (response) => {
          this._notificationService.showInfo(
            'A importação está completa. Todos os registros já foram carregados.',
            'Processando folha de ponto'
          );
          this._router.navigate(['workday-records']);
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Erro no processamento da folha de ponto');
        },
      });
  }
}
