import { IEmployee, type INewEmployerRequest } from './../../interfaces/employer';
import { Component, inject, OnInit } from '@angular/core';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { EmployerService } from '../../services/employer';
import { EmployerModal } from '../../components/employer-components/employer-modal/employer-modal';
import { take } from 'rxjs';
import { EmployerCard } from '../../components/employer-components/employer-card/employer-card';

@Component({
  selector: 'app-employees',
  imports: [EmployerCard, SecondaryButton, PrimaryButton, EmployerModal],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees implements OnInit {
  private readonly _employerService = inject(EmployerService);

  employees: IEmployee[] = [];
  showModal = false;

  ngOnInit(): void {
    this.getEmployer();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveEmployer(newEmployer: INewEmployerRequest) {
    this._employerService
      .saveEmployer(newEmployer)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getEmployer();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getEmployer() {
     this._employerService
      .getEmployees()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.employees = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
