import { ProdutoPedido } from "./produto-pedido.model";

export interface Orcamento {
    id?: String;
    dataFim: String;
    dataInicio: String;
    clienteId: String;
    enderecoId: String;
    produtosPedidos: ProdutoPedido[];
}
