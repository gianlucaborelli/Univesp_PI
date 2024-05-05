import { Component, Input } from '@angular/core';
import { QuotationService } from '../../service/quotation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationStatus } from '../../utils/quotation-status.enum';
import { SnackBarService } from 'src/app/components/snack-bar/service/snack-bar.service';

@Component({
  selector: 'app-set-status-quotation.dialog',
  templateUrl: './set-status-quotation.dialog.component.html',
  styleUrl: './set-status-quotation.dialog.component.scss'
})
export class SetStatusQuotationDialogComponent {
  @Input() quotationId!: string | undefined;

  statusKeys = [
    QuotationStatus.Aguardando_Pagamento,
    QuotationStatus.Cancelado,
    QuotationStatus.Concluido,
    QuotationStatus.Confirmado,
    QuotationStatus.Pago,
    QuotationStatus.Pendente];
  selected = null;
  status = QuotationStatus;


  constructor(
    private dialogRef: MatDialogRef<SetStatusQuotationDialogComponent>,
    private service: QuotationService,
    private _snack: SnackBarService
  ) {
    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize("20%");
  }

  save() {
    console.log(this.selected!)
    this.service.setStatus(this.quotationId!, { statusCode: this.selected! }).subscribe({
      next: () => {
        this._snack.open('Status atualizado com sucesso!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this._snack.open(err.error.detail)
      }
    });
  }
}
