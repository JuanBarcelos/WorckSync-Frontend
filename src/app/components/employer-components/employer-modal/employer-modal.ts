import { Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { PrimaryButton } from '../../shared/primary-button/primary-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployerService } from '../../../services/employer';
import type { INewEmployerRequest } from '../../../interfaces/employer';
import { take } from 'rxjs';
import { ShiftService } from '../../../services/shift';
import type { IShift } from '../../../interfaces/shift';

@Component({
  selector: 'app-employer-modal',
  imports: [PrimaryButton, ReactiveFormsModule],
  templateUrl: './employer-modal.html',
  styleUrl: './employer-modal.scss',
})
export class EmployerModal implements OnInit {
  private readonly _shiftService = inject(ShiftService);

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  shifts: IShift[] = [];

  employerForm = new FormGroup({
    IDEmployer: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    admissionDate: new FormControl('', [Validators.required]),
    shiftId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getShift();
  }

  applyEmployer() {
    if (this.employerForm.invalid) return;
    const newEmployer: INewEmployerRequest = {
      sheetId: this.employerForm.value.IDEmployer as string,
      name: this.employerForm.value.name as string,
      email: this.employerForm.value.email as string,
      phone: this.employerForm.value.phone as string,
      document: this.employerForm.value.document as string,
      position: this.employerForm.value.position as string,
      department: this.employerForm.value.department as string,
      admissionDate: this.employerForm.value.admissionDate as string,
      shiftId: this.employerForm.value.shiftId as string,
    };

    this.apply.emit(newEmployer);
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
}
