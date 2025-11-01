import { Component } from '@angular/core';
import { InputUpload } from '../../components/input-upload/input-upload';
import { PrimaryButton } from "../../components/shared/primary-button/primary-button";

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
  stats?: ImportStats

  onFileUploaded(file: File) {
    console.log('Arquivo recebido no componente pai:', file);

    // 🔹 Aqui você pode integrar com o backend ou XLSX.js para leitura real
    // Por enquanto, simula os resultados:
    this.stats = {
      totalArquivos: 1,
      importadosSucesso: 1,
      erros: 0,
      totalLinhas: 15,
      fileName: file.name
    };
  }
}
