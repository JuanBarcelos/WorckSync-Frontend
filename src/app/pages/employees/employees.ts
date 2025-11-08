import { IEmployee } from './../../interfaces/employer';
import { Component, inject, OnInit } from '@angular/core';
import { EmployerCard } from '../../components/employer-card/employer-card';
import { SecondaryButton } from "../../components/shared/secondary-button/secondary-button";
import { PrimaryButton } from "../../components/shared/primary-button/primary-button";
import { EmployerService } from '../../services/employer';

@Component({
  selector: 'app-employees',
  imports: [EmployerCard, SecondaryButton, PrimaryButton],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees implements OnInit {
  private readonly _employerService = inject(EmployerService);

  employees:IEmployee[] = [];


  ngOnInit(): void {
    this._employerService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
