import { Component } from '@angular/core';
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
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ["name", "obs", "role", "actions"];

  constructor(
    private service: UserService,
    private dialog: MatDialog) {

    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  refreshTable() {
    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddNewCostumerDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ClienteDetailDialogComponent, dialogConfig);
  }

  @needConfirmation()
  deletarCliente(userId: String) {
    this.service.delete(userId).subscribe(() => {
      this.refreshTable();
    });
  }
}