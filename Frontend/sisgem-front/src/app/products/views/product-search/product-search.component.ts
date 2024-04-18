import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from "@angular/core";
import { needConfirmation } from "src/app/components/decorator/confirm-dialog.decorator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProductDetailDialog } from "../../components/product-detail/product-detail.dialog.component";
import { Product } from "../../models/product.model";
import { ProductService } from "../../service/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-search",
  templateUrl: "./product-search.component.html",
  styleUrls: ["./product-search.component.scss"],
  providers:    [    
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, 
  ],
})
export class ProductSearchComponent {
  dataSource!: MatTableDataSource<Product>;
  posts: any;
  displayedColumns: string[] = ["name", "description", "price", "stock", "actions"];

  constructor(    
    private router: Router,
    private service: ProductService,
    private dialog: MatDialog
  ) {
    this.service.findAll().subscribe((resposta) => {
      this.posts = resposta;
      this.dataSource = new MatTableDataSource(resposta);
    });
  }

  refreshTable() {
    this.service.findAll().subscribe((response) => {
      this.posts = response;
      this.dataSource = new MatTableDataSource(response);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  openAddNewProductDialog() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ProductDetailDialog, dialogConfig);
    return dialogRef.afterClosed().subscribe((response) => { 
      if(response){
        this.router.navigate(['/admin/products/' + response] )
      }           
    });
  }

  @needConfirmation()
  deletarProduto(productId: String) {
    this.service.delete(productId).subscribe(() => {
      this.refreshTable();
    });
  }
}
