import { Component, inject, type OnInit } from '@angular/core';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { ShiftCard } from '../../components/shift-card/shift-card';
import type { IShift } from '../../interfaces/shift';
import { ShiftService } from '../../services/shift';
import { ShiftModal } from "../../components/shift-modal/shift-modal";
import { take } from 'rxjs';

@Component({
  selector: 'app-shift',
  imports: [SecondaryButton, PrimaryButton, ShiftCard, ShiftModal],
  templateUrl: './shift.html',
  styleUrl: './shift.scss',
})
export class Shift implements OnInit {
  private readonly _shiftService = inject(ShiftService);
  shifts: IShift[] = [];
  showModal = false;

  ngOnInit(): void {
    this._shiftService.getShiftAll().pipe(take(1)).subscribe({
      next: (response) => {
        this.shifts = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
