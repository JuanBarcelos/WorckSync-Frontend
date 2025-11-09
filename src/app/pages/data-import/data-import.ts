import { Component, inject } from '@angular/core';
import { InputUpload } from '../../components/input-upload/input-upload';
import { PrimaryButton } from "../../components/shared/primary-button/primary-button";
import { UploadFileService } from '../../services/upload-file';
import type { ImportInfo } from '../../interfaces/upload-success-response';

interface ImportStats {
  totalArquivos: number;
  importadosSucesso: number;
  erros: number;
  totalLinhas: number;
  fileName: string;
}

@Component({
  selector: 'app-data-import',
  imports: [InputUpload, PrimaryButton],
  templateUrl: './data-import.html',
  styleUrl: './data-import.scss',
})
export class DataImport {
  private readonly _uploadFileService = inject(UploadFileService);

  stats?: ImportInfo

  onFileUploaded(file: File) {
    // 🔹 Aqui você pode integrar com o backend ou XLSX.js para leitura real
    this._uploadFileService.upload(file).subscribe({
      next: (response) => {
        this.stats = {
          ...response.import,
          totalFile: 1,
          importadosSucesso: 1
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
