import { User } from "../../user/models/user.model";
import { Address } from "../../user/models/address.model";
import { ProdutoPedido } from "../../products/models/produto-pedido.model";

export interface Quotation {
    id?: String;
    finalDate?: String;
    initialDate?: String;
    totalPrice: String;
    user?: User | null;
    address?: Address | null;
    quotedProducts: ProdutoPedido[] | null;
}
