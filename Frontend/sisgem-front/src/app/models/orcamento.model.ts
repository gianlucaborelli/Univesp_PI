import { Cliente } from "./clientes.model";
import { Endereco } from "./endereco.model";
import { ProdutoPedido } from "./produto-pedido.model";

export interface Orcamento {
    id?: String;
    dataFim?: String;
    dataInicio?: String;
    cliente?: Cliente;
    endereco?: Endereco | null;
    produtosPedidos?: ProdutoPedido[];
}
