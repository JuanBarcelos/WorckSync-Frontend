import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from "../shared/primary-button/primary-button";

@Component({
  selector: 'app-shift-modal',
  imports: [PrimaryButton],
  templateUrl: './shift-modal.html',
  styleUrl: './shift-modal.scss',
})
export class ShiftModal {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();
}
