import { Component, EventEmitter, Input, Output, type OnChanges } from '@angular/core';
import { PrimaryButton } from '../../shared/primary-button/primary-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { INewShiftRequest, IShift } from '../../../interfaces/shift';

@Component({
  selector: 'app-shift-modal',
  imports: [PrimaryButton, ReactiveFormsModule],
  templateUrl: './shift-modal.html',
  styleUrl: './shift-modal.scss',
})
export class ShiftModal implements OnChanges{
  @Input() visible = false;
  @Input() shift?: IShift;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  shiftForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    lunchStartTime: new FormControl('', [Validators.required]),
    lunchEndTime: new FormControl('', [Validators.required]),
    toleranceMinutes: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnChanges(): void {
    if(this.shift) {
      this.shiftForm.patchValue({
        ...this.shift,
        toleranceMinutes: String(this.shift.toleranceMinutes),
      });

    }else{
      this.shiftForm.reset();
    }

  }

  applyShift() {
    if(this.shiftForm.invalid) return;

    const newShift: INewShiftRequest = {
      name: this.shiftForm.value.name as string,
      code: this.shiftForm.value.code as string,
      startTime: this.shiftForm.value.startTime as string,
      endTime: this.shiftForm.value.endTime as string,
      lunchStartTime: this.shiftForm.value.lunchStartTime as string,
      lunchEndTime: this.shiftForm.value.lunchEndTime as string,
      workDays: [1,3,5,7],
      toleranceMinutes: Number(this.shiftForm.value.toleranceMinutes),
      overtimeAllowed: true,
      description: this.shiftForm.value.description as string
    }

    this.apply.emit(newShift);
  }
}
