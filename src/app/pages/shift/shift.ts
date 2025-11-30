import { Component, inject, type OnInit } from '@angular/core';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { ShiftCard } from '../../components/shift-components/shift-card/shift-card';
import type { INewShiftRequest, IShift } from '../../interfaces/shift';
import { ShiftService } from '../../services/shift';
import { take } from 'rxjs';
import { ShiftModal } from '../../components/shift-components/shift-modal/shift-modal';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-shift',
  imports: [SecondaryButton, PrimaryButton, ShiftCard, ShiftModal],
  templateUrl: './shift.html',
  styleUrl: './shift.scss',
})
export class Shift implements OnInit {
  private readonly _shiftService = inject(ShiftService);
  private readonly _notificationService = inject(NotificationService);

  shifts: IShift[] = [];
  showModal = false;
  selectedShift?: IShift;

  ngOnInit(): void {
    this.getShift();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onCardAction(event: { type: string; shift: IShift }) {
    if (event.type === 'Editar') {
      this.selectedShift = event.shift;
      this.showModal = true;
    } else if (event.type === 'Excluir') {
      this.deleteShift(event.shift.id);
    } else if (event.type === 'Detalhes') {
      console.log(event.shift);
    }
  }

  saveNewShift(newShift: INewShiftRequest) {
    this._shiftService
      .saveShift(newShift)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getShift();
          this._notificationService.showSuccess(
            'O novo turno foi cadastrado com sucesso e já está disponível para uso.',
            'Turno criado'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Error ao cadastrar o turno');
        },
      });
  }

  deleteShift(id: string) {
    this._shiftService
      .deleteShift(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getShift();
          this._notificationService.showWarning(
            'O turno foi removido com sucesso do sistema.',
            'Turno excluído'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Erro ao excluir turno');
        },
      });
  }

  updateShift(id: string, newEmployer: INewShiftRequest) {
    this._shiftService
      .updateShift(id, newEmployer)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getShift();
          this._notificationService.showSuccess(
            'As informações do turno foram atualizadas com sucesso.',
            'Turno atualizado'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Erro ao atualizar turno');
        },
      });
  }

  getShift() {
    this._shiftService
      .getShiftAll()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.shifts = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  saveShift(shift: IShift) {
    if (this.selectedShift) {
      this.updateShift(this.selectedShift.id, shift);
    } else {
      this.saveNewShift(shift);
    }
  }
}
