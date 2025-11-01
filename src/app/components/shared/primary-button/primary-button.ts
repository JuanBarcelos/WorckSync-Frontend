import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.scss',
})

export class PrimaryButton {
  @Input() label: string = "";
  @Input() icon: boolean = false;
  @Input() iconUpload: boolean = false;
}
