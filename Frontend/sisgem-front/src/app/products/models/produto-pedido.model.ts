import { Quotation } from "../../quotation/models/quotation.model";
import { Product } from "./product.model";

export interface ProdutoPedido {
    id?: String;
    preco: String;
    quantidade: String;
    produto: Product;
    orcamento: Quotation;
}