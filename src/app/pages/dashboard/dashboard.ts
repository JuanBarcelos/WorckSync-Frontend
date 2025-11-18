import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { DashboardCard, type CardData } from '../../components/dashboard-card/dashboard-card';
import { PrimaryButton } from "../../components/shared/primary-button/primary-button";
import { SecondaryButton } from "../../components/shared/secondary-button/secondary-button";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard, PrimaryButton, SecondaryButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly _router = inject(Router);

  cards: CardData[] = [
    {
      iconClass: 'ph ph-users-three',
      title: 'Funcionários',
      description: 'Gerencie os colaboradores da empresa e visualize seus dados de ponto e jornada.',
      router: '/employees',
    },
    {
      iconClass: 'ph ph-clock-user',
      title: 'Turnos',
      description: 'Organize os turnos de trabalho e mantenha os horários sempre atualizados.',
       router: '/shifts',
    },
    {
      iconClass: 'ph ph-files',
      title: 'Relatórios',
      description: 'Acompanhe métricas e registros de ponto com relatórios claros e detalhados.',
       router: '',
    }
  ];

  navigateImports(){
    this._router.navigate(['data-imports'])
  }
  navigateRecords(){
    this._router.navigate(['workday-records'])
  }
}
