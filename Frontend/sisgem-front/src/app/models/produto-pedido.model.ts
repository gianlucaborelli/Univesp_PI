import { Orcamento } from "./orcamento.model";
import { Product } from "./product.model";

export interface ProdutoPedido {
    id?: String;
    preco: String;
    quantidade: String;
    produto: Product;
    orcamento: Orcamento;
}