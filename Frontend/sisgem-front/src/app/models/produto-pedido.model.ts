import { Orcamento } from "./orcamento.model";
import { Produto } from "./produtos.model";

export interface ProdutoPedido {
    id?: String;
    preco: String;
    quantidade: String;
    produto: Produto;
    orcamento: Orcamento;
}

export interface AddProdutoPedido {    
    quantidade: String;
    produtoId: String;
    orcamentoId: String;
}