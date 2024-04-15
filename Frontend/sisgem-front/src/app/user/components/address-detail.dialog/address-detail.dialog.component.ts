import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/components/shared/snack-bar/service/snack-bar.service';
import { Address } from 'src/app/user/models/address.model';
import { AddressService } from 'src/app/user/service/address.service';

@Component({
  selector: 'app-address-detail.dialog',
  templateUrl: './address-detail.dialog.component.html',
  styleUrls: ['./address-detail.dialog.component.scss']
})
export class AddressDetailDialog {
  enderecoForm!: FormGroup;
  userId = '';
  addressId = '';

  zipCodeError = '';
  userIdError = '';
  streetError = '';
  numberError = '';
  districtError = '';
  cityError = '';
  stateError = '';
  descriptionError = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddressDetailDialog>,
    private _snack: SnackBarService,
    private service: AddressService) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("40%");

    this.enderecoForm = this.formBuilder.group({
      zipCode: ['', Validators.required],
      userId: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.maxLength(200)]
    });

    if (data != null) {
      if (data.idCliente != null) {
        this.userId = data.idCliente;
      } else if (data.enderecoId != null) {
        this.service.findById(data.enderecoId).subscribe((response) => {
          this.addressId = response.id!;
          this.userId = response.userId!;
          this.enderecoForm.setValue(response);
        });
      }
    } else {
      _snack.open("Erro ao carregar.");
      this.dialogRef.close(false);
    }
  }

  updateZipcodeErrorMessage() {
    const zipCodeControl = this.enderecoForm.get('zipCode');
    if (zipCodeControl && zipCodeControl.hasError('required')) {
      this.zipCodeError = 'You must enter a value';
    } else {
      this.zipCodeError = '';
    }
  }

  focusOutFunction() {
    const cepPattern = /^\d{8}$/;
    const zipCode = this.enderecoForm.get('zipCode')!.value;
    if (!cepPattern.test(zipCode)) {
      return;
    }

    this.service.findByCep(zipCode).subscribe((resposta) => {
      this.enderecoForm.patchValue(resposta);
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this._snack.open(err.error.errors[i].message);
      }
    });
  }

  saveOnClick() {
    const address: Address = {
      id: this.addressId,
      userId: this.userId,
      zipCode: this.enderecoForm.get('zipCode')!.value,
      street: this.enderecoForm.get('street')!.value,
      number: this.enderecoForm.get('number')!.value,
      district: this.enderecoForm.get('district')!.value,
      city: this.enderecoForm.get('city')!.value,
      state: this.enderecoForm.get('state')!.value,
      description: this.enderecoForm.get('description')!.value
    };
    console.log(address);
    this.service.create(address, this.userId).subscribe((resposta) => {
      this._snack.open('Endereço cadastrado com sucesso!');
      this.dialogRef.close(true);
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this._snack.open(err.error.errors[i].message);
      }
    });
  }
}

