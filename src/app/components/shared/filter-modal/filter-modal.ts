import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { IEmployee } from '../../../interfaces/employer';
import { EmployerService } from '../../../services/employer';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryButton } from '../primary-button/primary-button';

@Component({
  selector: 'app-filter-modal',
  imports: [CommonModule, ReactiveFormsModule, PrimaryButton],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.scss',
})
export class FilterModal implements OnInit {
  private readonly _employerService = inject(EmployerService);

  employerForm = new FormGroup({
    employerId: new FormControl('', [Validators.required]),
    status: new FormControl<string[]>([]),
  });

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  employees: IEmployee[] = [];
  statusOptions = [
    { label: 'Completo', value: 'Completo' },
    { label: 'Incompleto', value: 'Incompleto' },
    { label: 'Sem Registro', value: 'Sem Registro' },
  ];

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this._employerService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleStatus(value: string, checked: boolean) {
  const current = this.employerForm.value.status ?? [];

  const updated = checked
    ? [...current, value] // adiciona
    : current.filter(item => item !== value); // remove

  this.employerForm.get('status')?.setValue(updated);
}


  applyFilters() {
    const selectedEmployee = this.employees.find(
      (e) => e.id === this.employerForm.get('employerId')?.value
    );

    const filters = {
      employerName: selectedEmployee ? selectedEmployee.name : null,
      employerId: this.employerForm.get('employerId')?.value,
      status: this.employerForm.get('status')?.value ?? [],
    };

    this.apply.emit(filters);
    this.close.emit();
  }
}
