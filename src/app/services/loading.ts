import { Injectable } from '@angular/core';

export type LoadingState = 'idle' | 'loading' | 'done';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // estado atual
  public state: LoadingState = 'idle';

  // mensagem do modal
  public message: string = 'Processando...';

  // abrir modal em modo loading
  start(message: string = 'Processando...') {
    this.state = 'loading';
    this.message = message;
  }

  // trocar para estado concluído
  finish(message: string = 'Processamento concluído!') {
    this.message = message;
    this.state = 'done';

    // aguarda um pouco antes de fechar
    setTimeout(() => {
      this.reset();
    }, 1800);
  }

  // resetar tudo
  reset() {
    this.state = 'idle';
    this.message = 'Processando...';
  }
}
