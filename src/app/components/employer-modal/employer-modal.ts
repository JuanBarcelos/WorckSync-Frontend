import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from "../shared/primary-button/primary-button";

@Component({
  selector: 'app-employer-modal',
  imports: [PrimaryButton],
  templateUrl: './employer-modal.html',
  styleUrl: './employer-modal.scss',
})
export class EmployerModal {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();
}
