import { IEmployee, type INewEmployerRequest } from './../../interfaces/employer';
import { Component, inject, OnInit } from '@angular/core';
import { SecondaryButton } from '../../components/shared/secondary-button/secondary-button';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { EmployerService } from '../../services/employer';
import { EmployerModal } from '../../components/employer-components/employer-modal/employer-modal';
import { take } from 'rxjs';
import { EmployerCard } from '../../components/employer-components/employer-card/employer-card';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-employees',
  imports: [EmployerCard, SecondaryButton, PrimaryButton, EmployerModal],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees implements OnInit {
  private readonly _employerService = inject(EmployerService);
  private readonly _notificationService = inject(NotificationService);

  employees: IEmployee[] = [];
  showModal = false;
  selectedEmployer?: IEmployee;

  ngOnInit(): void {
    this.getEmployer();
  }

  openModal() {
    this.showModal = true;
    this.selectedEmployer = undefined;
  }

  closeModal() {
    this.showModal = false;
  }

  onCardAction(event: { type: string; employer: IEmployee }) {
    if (event.type === 'Editar') {
      this.selectedEmployer = event.employer;
      this.showModal = true;
    } else if (event.type === 'Excluir') {
      this.deleteEmployer(event.employer.id);
    } else if (event.type === 'Detalhes') {
      console.log(event.employer);
    }
  }

  saveNewEmployer(newEmployer: INewEmployerRequest) {
    this._employerService
      .saveEmployer(newEmployer)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getEmployer();
          this._notificationService.showSuccess(
            'O funcionário foi cadastrado com sucesso e já está disponível na folha de ponto.',
            'Cadastro realizado'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(
            err.error.message,
            'Error ao cadastrar o funcionário'
          );
        },
      });
  }

  update(id: string, newEmployer: INewEmployerRequest) {
    this._employerService
      .updateEmployer(id, newEmployer)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getEmployer();
          this._notificationService.showSuccess(
            'As informações do funcionário foram atualizadas com sucesso.',
            'Dados atualizados'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(
            err.error.message,
            'Error ao atualizar o funcionário'
          );
        },
      });
  }

  deleteEmployer(id: string) {
    this._employerService
      .deleteEmployer(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.closeModal();
          this.getEmployer();
                    this._notificationService.showWarning(
            'O cadastro do funcionário foi excluído com sucesso.',
            'Funcionário excluído'
          );
        },
        error: (err) => {
          console.log(err);
          this._notificationService.showError(err.error.message, 'Erro ao excluir funcionário');
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

  saveEmployer(employer: IEmployee) {
    // se tiver selectedEmployer, é edição
    if (this.selectedEmployer) {
      this.update(this.selectedEmployer.id, employer);
    } else {
      this.saveNewEmployer(employer);
    }
  }
}
