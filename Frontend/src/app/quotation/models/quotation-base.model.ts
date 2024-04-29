import { User } from "../../user/models/user.model";
import { Address } from "../../user/models/address.model";
import { QuotedProduct } from "../../products/models/quoted-product.model";

export interface QuotationBase {
    id: String;
    dataFim: String;
    dataInicio: String;
    cliente: User;
    endereco: Address;
    produtosPedidos: QuotedProduct[];
}