import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _toastrService = inject(ToastrService);

  showSuccess(message: string, title: string) {
    this._toastrService.success(message, title, {
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 3000,
    });
  }

  showError(message: string, title: string) {
    this._toastrService.error(message, title, {
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 3000,
    });
  }

  showInfo(message: string, title: string) {
    this._toastrService.info(message, title, {
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 3000,
    });
  }

  showWarning(message: string, title: string) {
    this._toastrService.warning(message, title, {
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 3000,
    });
  }
}
