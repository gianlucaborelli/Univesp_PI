import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-user-detail.dialog',
  templateUrl: './user-detail.dialog.component.html',
  styleUrls: ['./user-detail.dialog.component.scss']
})
export class UserDetailDialog implements OnInit {
  @Input() userId: string | undefined;  

  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserDetailDialog>,
    private formBuilder: FormBuilder,
    private service: UserService,
    private _snack: SnackBarService) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("40%");

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      obs: ['']
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.service.findById(this.userId).subscribe((response) => {
        this.userForm.get('name')!.setValue(response.name);
        this.userForm.get('obs')!.setValue(response.obs);
      });
    }
  }

  salvar() {
    if (!this.userId) {
      this.service.create({
        name: this.userForm.get('name')!.value,
        obs: this.userForm.get('obs')!.value
      }).subscribe({
        next: (response) => {
          this.dialogRef.close(response.id);
          this._snack.open('Cliente cadastrado com sucesso!');
        },
        error: err => {
          this._snack.open(err.error.detail);
        }
      })
    } else {
      this.service.update({
        name: this.userForm.get('name')!.value,
        obs: this.userForm.get('obs')!.value
      }).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this._snack.open('Cliente atualizado com sucesso!');
        },
        error: err => {
          this._snack.open(err.error.detail);
        }
      })
    }
  }
}
