import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { UserService } from '../../service/user.service';
import { Role } from '../../utils/role.enum';

@Component({
  selector: 'app-set-user-role-dialog',
  templateUrl: './set-user-role-dialog.component.html',
  styleUrl: './set-user-role-dialog.component.scss'
})
export class SetUserRoleDialogComponent {
  @Input() userId: string | undefined;

  rulesKeys = [Role.Administrador, Role.Usuário];
  selected = null;
  rules = Role;

  constructor(
    private dialogRef: MatDialogRef<SetUserRoleDialogComponent>,
    private _snack: SnackBarService,
    private service: UserService) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("20%");
  }


  save() {
    this.service.setRule(this.userId!, { rule: this.selected! }).subscribe({
      next: () => {
        this._snack.open('Nivel de Acesso atualizado com sucesso!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this._snack.open(err.error.detail)
      }
    });
  }
}
