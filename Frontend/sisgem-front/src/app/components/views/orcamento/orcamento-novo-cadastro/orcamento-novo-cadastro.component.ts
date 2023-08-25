import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Cliente } from 'src/app/models/clientes.model';
import { Endereco } from 'src/app/models/endereco.model';
import { ClientesService } from 'src/app/service/cliente-service/clientes.service';

@Component({
  selector: 'app-orcamento-novo-cadastro',
  templateUrl: './orcamento-novo-cadastro.component.html',
  styleUrls: ['./orcamento-novo-cadastro.component.css']
})
export class OrcamentoNovoCadastroComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  listaDeClientes!: Cliente[];
  filterOptionsList!: Observable<Cliente[]>;
  searchControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<OrcamentoNovoCadastroComponent>,
    private _formBuilder: FormBuilder,
    private clienteService: ClientesService) {

    this.clienteService.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.listaDeClientes = resposta;
    });
  }


  ngOnInit(): void {
    this.filterOptionsList = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: String): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.listaDeClientes.filter(cliente => cliente.name.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
  }

  primeiroFormControle = this._formBuilder.group({
    //searchControl: ['', Validators.required],
  });
  segundoFormControle = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  terceiroFormControle = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  salvar() { }

  close() {
    this.dialogRef.close();
  }
}
