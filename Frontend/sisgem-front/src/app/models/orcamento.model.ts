import { Cliente } from "./clientes.model";
import { Endereco } from "./endereco.model";
import { ProdutoPedido } from "./produto-pedido.model";

export interface Orcamento {
    id?: String;
    dataFim?: String;
    dataInicio?: String;
    valorTotal: String;
    cliente?: Cliente | null;
    endereco?: Endereco | null;
    produtosPedidos: ProdutoPedido[] | null;
}
