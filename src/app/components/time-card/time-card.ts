import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrimaryButton } from '../shared/primary-button/primary-button';
import type { ITimeRecords } from '../../interfaces/timeRecords';
import dayjs from 'dayjs';

// Tipos para o status derivado
export type RecordStatus = 'Completo' | 'Incompleto' | 'Sem Registro';

@Component({
  selector: 'app-time-card',
  imports: [CommonModule, ReactiveFormsModule, PrimaryButton],
  templateUrl: './time-card.html',
  styleUrl: './time-card.scss',
})
export class TimeCard implements OnInit, OnChanges {
  // Dependências
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);

  // --- Entradas & Saídas ---
  @Input({ required: true }) record!: ITimeRecords;
  @Output() recordUpdated = new EventEmitter<ITimeRecords>();

  // --- Estado Interno ---
  public isEditing = false;
  public isDirty = false;
  public status: RecordStatus = 'Sem Registro';
  public recordForm!: FormGroup;
  private originalValue!: Partial<ITimeRecords>;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se o @Input 'record' mudar, reinicie o formulário
    if (changes['record']) {
      this.initializeForm();
      this.isEditing = false;
      this.isDirty = false;
    }
  }

  /**
   * (Re)Inicializa o formulário com base no @Input 'record'
   */
  private initializeForm(): void {
    // Cria o formulário reativo
    this.recordForm = this.fb.group({
      clockIn1: [this.record.clockIn1 || null],
      clockOut1: [this.record.clockOut1 || null],
      clockIn2: [this.record.clockIn2 || null],
      clockOut2: [this.record.clockOut2 || null],
    });

    // Armazena o estado original para verificar o 'isDirty' (Regra 5)
    this.originalValue = this.recordForm.getRawValue();

    // Calcula o status inicial (Regra 1)
    this.updateStatus();

    // Escuta mudanças no formulário para atualizar o 'isDirty'
    this.recordForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      this.isDirty = JSON.stringify(values) !== JSON.stringify(this.originalValue);
    });

    // O formulário começa desabilitado
    this.recordForm.disable();
  }

  /**
   * Deriva o status com base nos horários (Regra 1)
   */
  private updateStatus(): void {
    const schedules = this.originalValue || this.record;
    const allFields = [
      schedules.clockIn1,
      schedules.clockOut1,
      schedules.clockIn2,
      schedules.clockOut2,
    ];
    const filledCount = allFields.filter(Boolean).length;

    if (filledCount === 4) {
      this.status = 'Completo';
    } else if (filledCount === 0) {
      this.status = 'Sem Registro';
    } else {
      this.status = 'Incompleto';
    }
  }

  /**
   * Retorna a classe CSS para o status badge
   */
  get statusBadgeClass(): string {
    return this.status.toLowerCase().replace(' ', '-');
  }

  /**
   * Retorna a classe CSS para o button background
   */
  get buttonBackgroundClass(): string {
    return this.buttonText.toLowerCase().replace(' ', '-');
  }

  /**
   * Retorna o texto do botão com base nas regras 4 e 5
   */
  get buttonText(): string {
    if (this.isEditing) {
      return this.isDirty ? 'Salvar Registro' : 'Cancelar';
    }
    return 'Editar Registro';
  }

  /**
   * Ação principal do botão (Editar ou Salvar)
   */
  public onButtonClick(): void {
    if (this.isEditing) {
      if (this.isDirty) {
        // --- Lógica de SALVAR ---
        const updatedValues = this.recordForm.getRawValue();

        this.recordUpdated.emit({
          ...this.record,
          ...updatedValues, // sobrescreve os campos editados
          updatedAt: new Date().toISOString(), // opcional: atualiza timestamp
        });

        // O novo "original" é o que acabamos de salvar
        this.originalValue = updatedValues;
        this.isDirty = false;
        this.isEditing = false;
        this.recordForm.disable();
        this.updateStatus(); // Recalcula o status
      } else {
        // --- Lógica de CANCELAR ---
        this.isEditing = false;
        this.recordForm.disable();
        // Reseta o formulário para os valores originais
        this.recordForm.reset(this.originalValue);
      }
    } else {
      // --- Lógica de EDITAR ---
      this.isEditing = true;
      this.recordForm.enable();
    }
  }

  /**
   * Formata a exibição do horário, mostrando '--:--' se estiver vazio.
   */
  public getDisplayTime(controlName: keyof ITimeRecords): string {
    return this.recordForm.get(controlName)?.value || '--:--';
  }

  transformDate(date: string) {
    return dayjs(date).locale('pt-br').format("DD/MM/YYYY")
  }
}
