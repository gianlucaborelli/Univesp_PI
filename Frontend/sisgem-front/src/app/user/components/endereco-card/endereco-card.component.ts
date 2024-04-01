import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { Address } from 'src/app/models/address.model';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EnderecoCadastroDialogComponent } from '../endereco-cadastro.dialog/endereco-cadastro.dialog.component';



@Component({
  selector: 'app-endereco-card',
  templateUrl: './endereco-card.component.html',
  styleUrls: ['./endereco-card.component.css']
})
export class EnderecoCardComponent {
  @Input() endereco!: Address;

  constructor(private service: EnderecoService, private dialog: MatDialog) { }

  editarEndereco(enderecoId: String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { enderecoId: enderecoId };
    this.dialog.open(EnderecoCadastroDialogComponent, dialogConfig);
  }

  @needConfirmation()
  excluirEndereco(enderecoId: String) {
    this.service.delete(enderecoId).subscribe();
  }
}
