import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  imports: [],
  templateUrl: './secondary-button.html',
  styleUrl: './secondary-button.scss',
})
export class SecondaryButton {
  @Input() label: string = "";
  @Input() icon: boolean = false;
  @Input() iconClass: string = "";
  @Output() openModal = new EventEmitter<void>();

   handleClick() {
    this.openModal.emit();
  }
}
