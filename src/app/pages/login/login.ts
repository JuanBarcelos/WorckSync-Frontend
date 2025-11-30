import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { PrimaryButton } from '../../components/shared/primary-button/primary-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-login',
  imports: [PrimaryButton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  Login() {
    if (this.userForm.invalid) return;

    this._userService.Login(
      this.userForm.get('email')?.value as string,
      this.userForm.get('password')?.value as string
    ).subscribe({
      next: (response) => {
        this._notificationService.showSuccess('Acesso autorizado. Bem-vindo! Carregando seus dados de folha de ponto.', 'Login realizado')
        this._userAuthService.setUserToken(response.token);
        this._router.navigate(['/dashboard']);
      },
      error: (err) =>{
        console.log(err.error.message)
        this._notificationService.showError(err.error.message, 'Error ao fazer Login')
      },
    });
  }
}
