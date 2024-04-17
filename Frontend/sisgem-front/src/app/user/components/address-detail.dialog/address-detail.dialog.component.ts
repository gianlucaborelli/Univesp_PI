import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';
import { Address } from 'src/app/user/models/address.model';
import { AddressService } from 'src/app/user/service/address.service';

@Component({
  selector: 'app-address-detail.dialog',
  templateUrl: './address-detail.dialog.component.html',
  styleUrls: ['./address-detail.dialog.component.scss']
})
export class AddressDetailDialog implements OnInit {
  @Input() userId: string | undefined;
  @Input() addressId: string | undefined;

  enderecoForm!: FormGroup;

  zipCodeError = '';
  userIdError = '';
  streetError = '';
  numberError = '';
  districtError = '';
  cityError = '';
  stateError = '';
  descriptionError = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddressDetailDialog>,
    private _snack: SnackBarService,
    private service: AddressService) {

    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("40%");

    this.enderecoForm = this.formBuilder.group({
      id: [''],
      zipCode: ['', Validators.required],
      userId: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.maxLength(200)]
    });    
  }

  ngOnInit(): void {
    if (this.addressId) {
      this.service.findById(this.userId!, this.addressId!).subscribe((response) => {        
        this.enderecoForm.setValue(response);
      });
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
      this._snack.open(err.error.detail);      
    });
  }

  saveOnClick() {
    const address: Address = {
      id: this.addressId,
      userId: this.userId!,
      zipCode: this.enderecoForm.get('zipCode')!.value,
      street: this.enderecoForm.get('street')!.value,
      number: this.enderecoForm.get('number')!.value,
      district: this.enderecoForm.get('district')!.value,
      city: this.enderecoForm.get('city')!.value,
      state: this.enderecoForm.get('state')!.value,
      description: this.enderecoForm.get('description')!.value
    };
    this.service.create(address, this.userId!).subscribe((resposta) => {
      this._snack.open('Endereço cadastrado com sucesso!');
      this.dialogRef.close(true);
    }, err => {
      this._snack.open(err.error.detail);    
    });
  }
}

