import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes.model';
import { ClientesService } from '../clientes.service';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteDetailDialogComponent } from '../clientes-cadastro/cliente-detail.dialog/cliente-detail.dialog.component';
import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {
  dataSource!: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ["id", "name", "obs", "acoes"];
  posts: any;

  constructor(private service: ClientesService, private router: Router, private dialog: MatDialog) {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaClientesCadastro(idCliente?: String) {
    this.router.navigate(['clientescadastro'], { queryParams: { parametro: idCliente } })
      .then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
  }

  openAddNewCostumerDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ClienteDetailDialogComponent, dialogConfig);
  }

  @needConfirmation()
  deletarCliente(idCliente: String) {
    this.service.delete(idCliente).subscribe();
  }
}
