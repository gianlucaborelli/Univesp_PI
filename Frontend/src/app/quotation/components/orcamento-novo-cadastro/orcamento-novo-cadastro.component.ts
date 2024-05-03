import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, map, startWith, tap } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { Address } from 'src/app/user/models/address.model';
import { ProdutoEmEstoque } from 'src/app/products/models/produto-em-estoque.model';
import { UserService } from 'src/app/user/service/user.service';
import { AddressService } from 'src/app/user/service/address.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AvailableProductService } from 'src/app/products/service/availableProduct.service';
import { Quotation } from 'src/app/quotation/models/quotation.model';
import { QuotationService } from 'src/app/quotation/service/quotation.service';
import { format } from 'date-fns';
import { ProdutoExiste } from 'src/app/products/models/produto-existe.model';
import { needConfirmation } from 'src/app/components/decorator/confirm-dialog.decorator';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-orcamento-novo-cadastro',
  templateUrl: './orcamento-novo-cadastro.component.html',
  styleUrls: ['./orcamento-novo-cadastro.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class OrcamentoNovoCadastroComponent  {
  
}
