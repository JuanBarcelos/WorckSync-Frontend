import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.scss',
})

export class PrimaryButton {
  @Input() label: string = "";
  @Input() icon: boolean = false;
  @Input() iconClass: string = "";
  @Input() buttonClass: string = '';
  @Input() isDisabled: boolean = false;
  @Output() openModal = new EventEmitter<void>();

  handleClick() {
    this.openModal.emit();
  }
}
