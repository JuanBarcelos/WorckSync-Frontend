import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading';

@Component({
  selector: 'app-loading-modal',
  imports: [],
  templateUrl: './loading-modal.html',
  styleUrl: './loading-modal.scss',
})
export class LoadingModal {
  public readonly _loading = inject(LoadingService)
}
