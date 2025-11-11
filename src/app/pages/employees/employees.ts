import { IEmployee } from './../../interfaces/employer';
import { Component, inject, OnInit } from '@angular/core';
import { EmployerCard } from '../../components/employer-card/employer-card';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { EmployerService } from '../../services/employer';
import { EmployerModal } from '../employer-modal/employer-modal';

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
    this._employerService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
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
