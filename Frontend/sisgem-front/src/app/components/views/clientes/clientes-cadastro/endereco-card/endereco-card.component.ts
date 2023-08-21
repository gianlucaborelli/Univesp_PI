import { Component, Input } from '@angular/core';
import { Endereco } from '../../clientes.model';

@Component({
  selector: 'app-endereco-card',
  templateUrl: './endereco-card.component.html',
  styleUrls: ['./endereco-card.component.css']
})
export class EnderecoCardComponent {
  @Input() endereco!: Endereco;

  editarEndereco() { }

  excluirEndereco() { }
}
