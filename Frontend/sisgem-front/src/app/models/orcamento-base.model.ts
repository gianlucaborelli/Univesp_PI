import { User } from "../user/models/user.model";
import { Address } from "./address.model";
import { ProdutoPedido } from "../products/models/produto-pedido.model";

export interface OrcamentoBase {
    id: String;
    dataFim: String;
    dataInicio: String;
    cliente: User;
    endereco: Address;
    produtosPedidos: ProdutoPedido[];
}