import { User } from "./user.model";
import { Address } from "./address.model";
import { ProdutoPedido } from "./produto-pedido.model";

export interface Orcamento {
    id?: String;
    finalDate?: String;
    initialDate?: String;
    totalPrice: String;
    user?: User | null;
    address?: Address | null;
    quotedProducts: ProdutoPedido[] | null;
}
