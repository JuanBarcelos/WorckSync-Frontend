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

@Component({
  selector: 'app-filter-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.scss',
})
export class FilterModal implements OnInit {
  private readonly _employerService = inject(EmployerService);

  employerForm = new FormGroup({
    employerId: new FormControl('', [Validators.required]),
  });

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  employees: IEmployee[] = [];

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

  applyFilters() {
    const selectedEmployee = this.employees.find(e => e.id === this.employerForm.get('employerId')?.value);
    
    const filters = {
      employerName: selectedEmployee ? selectedEmployee.name : null,
      employerId: this.employerForm.get('employerId')?.value,
    };

    this.apply.emit(filters);
    this.close.emit();
  }
}
