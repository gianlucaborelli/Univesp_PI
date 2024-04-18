import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';
import { UserDetailDialog } from '../../components/user-detail.dialog/user-detail.dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ["name", "obs", "role", "actions"];

  constructor(
    private router: Router,
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
    const dialogRef = this.dialog.open(UserDetailDialog, dialogConfig);
    return dialogRef.afterClosed().subscribe((response) => {      
      this.router.navigate(['/admin/users/' + response] )
    });
  }

  @needConfirmation()
  deletarCliente(userId: String) {
    this.service.delete(userId).subscribe(() => {
      this.refreshTable();
    });
  }
}
