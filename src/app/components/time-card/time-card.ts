import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  type OnChanges,
  type OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrimaryButton } from '../shared/primary-button/primary-button';

// Define a interface principal para o seu registro
export interface TimeRecord {
  data: string;
  schedules: {
    entryTime?: string | null;
    startLunch?: string | null;
    endLunch?: string | null;
    departureTime?: string | null;
  };
}

// Tipos para o status derivado
export type RecordStatus = 'Completo' | 'Incompleto' | 'Sem Registro';

// Interface para o formulário reativo
interface ScheduleForm {
  entryTime: FormControl<string | null>;
  startLunch: FormControl<string | null>;
  endLunch: FormControl<string | null>;
  departureTime: FormControl<string | null>;
}

// Tipo para os valores do formulário
type ScheduleFormValue = {
  entryTime: string | null;
  startLunch: string | null;
  endLunch: string | null;
  departureTime: string | null;
};

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
  @Input({ required: true }) record!: TimeRecord;
  @Output() recordUpdated = new EventEmitter<TimeRecord>();

  // --- Estado Interno ---
  public isEditing = false;
  public isDirty = false;
  public status: RecordStatus = 'Sem Registro';
  public recordForm!: FormGroup<ScheduleForm>;
  private originalSchedulesValue!: ScheduleFormValue;

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
    const schedules = this.record.schedules;

    // Cria o formulário reativo
    this.recordForm = this.fb.group({
      entryTime: [schedules.entryTime || null],
      startLunch: [schedules.startLunch || null],
      endLunch: [schedules.endLunch || null],
      departureTime: [schedules.departureTime || null],
    });

    // Armazena o estado original para verificar o 'isDirty' (Regra 5)
    this.originalSchedulesValue = this.recordForm.getRawValue();

    // Calcula o status inicial (Regra 1)
    this.updateStatus();

    // Escuta mudanças no formulário para atualizar o 'isDirty'
    this.recordForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      this.isDirty = JSON.stringify(values) !== JSON.stringify(this.originalSchedulesValue);
    });

    // O formulário começa desabilitado
    this.recordForm.disable();
  }

  /**
   * Deriva o status com base nos horários (Regra 1)
   */
  private updateStatus(): void {
    const schedules = this.originalSchedulesValue || this.record.schedules;
    const allFields = [
      schedules.entryTime,
      schedules.startLunch,
      schedules.endLunch,
      schedules.departureTime,
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
    const tt =  this.buttonText.toLowerCase().replace(' ', '-');
    console.log(tt)
    return tt
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
        const updatedSchedules = this.recordForm.getRawValue();

        this.recordUpdated.emit({
          ...this.record,
          schedules: updatedSchedules,
        });

        // O novo "original" é o que acabamos de salvar
        this.originalSchedulesValue = updatedSchedules;
        this.isDirty = false;
        this.isEditing = false;
        this.recordForm.disable();
        this.updateStatus(); // Recalcula o status
      } else {
        // --- Lógica de CANCELAR ---
        this.isEditing = false;
        this.recordForm.disable();
        // Reseta o formulário para os valores originais
        this.recordForm.reset(this.originalSchedulesValue);
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
  public getDisplayTime(controlName: keyof ScheduleForm): string {
    return this.recordForm.get(controlName)?.value || '--:--';
  }
}
