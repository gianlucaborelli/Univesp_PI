import { Produto } from "./produtos.model";

export interface ProdutoPedido {
    id?: String;
    preco: String;
    quantidade: String;
    produto: Produto;
    orcamentoId: String
}
