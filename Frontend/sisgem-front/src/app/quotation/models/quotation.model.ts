import { User } from "../../user/models/user.model";
import { Address } from "../../user/models/address.model";
import { QuotedProduct } from "../../products/models/quoted-product.model";

export interface Quotation {
    id?: string;
    finalDate?: string;
    initialDate?: string;
    totalPrice: string;
    user?: User | null;
    address?: Address | null;
    quotedProducts: QuotedProduct[] | null;
}
