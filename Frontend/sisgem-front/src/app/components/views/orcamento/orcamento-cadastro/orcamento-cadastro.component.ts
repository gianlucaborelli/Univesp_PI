import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Orcamento } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/service/orcamento/orcamento.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-orcamento-cadastro',
  templateUrl: './orcamento-cadastro.component.html',
  styleUrls: ['./orcamento-cadastro.component.css']
})

export class OrcamentoCadastroComponent implements OnInit {
  orcamento: Orcamento = {
    dataFim:'',
    dataInicio:'',
    id: '',
    endereco: null,
    cliente: null,
    produtosPedidos: undefined
  };  
  
  constructor(private service: OrcamentoService,
    private router: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog) {
      this.initClienteAdd();

      this.router.queryParams.subscribe(params => {
        const valor = params['parametro'];
        if (valor) {
          this.service.findById(valor).subscribe((orcamento) => {
            this.orcamento = orcamento;
            console.log(this.orcamento);
          })
        }
      });
  }

  ngOnInit(): void {
    
  }

  public initClienteAdd() {
    this.router.queryParams.subscribe(params => {
      const valor = params['parametro'];
      if (valor) {
        this.service.orcamentoUpdate.subscribe((resposta) => {
          console.log(resposta);
          if (resposta) {
            this.service.findById(valor).subscribe((orcamento) => {
              this.orcamento = orcamento;
            })
          }
        });
      }
    });
  }

  back(): void {
    this.location.back()
  }

  openEditClienteDialog(){}

  openAddAddressDialog(){}

}
