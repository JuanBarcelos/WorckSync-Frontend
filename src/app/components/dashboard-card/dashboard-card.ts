import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

export interface CardData {
  iconClass: string;
  title: string;
  description: string;
  router: string;
}

@Component({
  selector: 'app-dashboard-card',
  imports: [RouterLink],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
})

export class DashboardCard {
  @Input() cardData!: CardData;
}
