import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from "../shared/primary-button/primary-button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer-modal',
  imports: [PrimaryButton, ReactiveFormsModule],
  templateUrl: './employer-modal.html',
  styleUrl: './employer-modal.scss',
})
export class EmployerModal {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  employerForm = new FormGroup({
    IDEmployer: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    admissionDate: new FormControl('', [Validators.required]),
    shiftId: new FormControl('', [Validators.required]),
  })
}
