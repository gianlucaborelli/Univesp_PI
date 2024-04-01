import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { needConfirmation } from 'src/app/decorator/confirm-dialog.decorator';
import { ClienteDetailDialogComponent } from '../../components/cliente-detail.dialog/cliente-detail.dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ["id", "name", "obs", "acoes"];
  posts: any;

  constructor(private service: UserService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute) {
    this.service.findAll().subscribe((resposta) => {
      console.log(resposta);
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  ngOnInit(): void {
  }

  refreshTable() {
    this.service.findAll().subscribe((resposta) => {
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaClientesCadastro(idCliente?: String) {
    this.router.navigate(['/home/clientescadastro'], { queryParams: { parametro: idCliente } })
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
    this.service.delete(idCliente).subscribe(() => {
      this.refreshTable();
    });
  }
}
