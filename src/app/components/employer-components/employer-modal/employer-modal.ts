import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnChanges,
  OnInit,
} from '@angular/core';
import { PrimaryButton } from '../../shared/primary-button/primary-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { IEmployee, INewEmployerRequest } from '../../../interfaces/employer';
import { take } from 'rxjs';
import { ShiftService } from '../../../services/shift';
import type { IShift } from '../../../interfaces/shift';
import dayjs from 'dayjs';

@Component({
  selector: 'app-employer-modal',
  imports: [PrimaryButton, ReactiveFormsModule],
  templateUrl: './employer-modal.html',
  styleUrl: './employer-modal.scss',
})
export class EmployerModal implements OnInit, OnChanges{
  private readonly _shiftService = inject(ShiftService);

  @Input() visible = false;
  @Input() employer?: IEmployee;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  shifts: IShift[] = [];

  employerForm = new FormGroup({
    sheetId: new FormControl('', [Validators.required]),
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

  ngOnChanges(): void {
    if (this.employer) {
      this.employerForm.patchValue({
        ...this.employer,
        admissionDate: dayjs(this.employer.admissionDate).locale('pt-br').format("DD/MM/YYYY")
      })
    } else {
      this.employerForm.reset();
    }
  }

  applyEmployer() {
    if (this.employerForm.invalid) return;
    const newEmployer: INewEmployerRequest = {
      sheetId: this.employerForm.value.sheetId as string,
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
