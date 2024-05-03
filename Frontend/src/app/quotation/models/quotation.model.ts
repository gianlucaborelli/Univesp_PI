import { User } from "../../user/models/user.model";
import { QuotedProduct } from "./quoted-product.model";
import { ShippingAddress } from "./shipping-address.model";

export interface Quotation {
    id: string;
    finalDate: string;
    initialDate: string;
    totalPrice: number;
    user: User | null;
    status?:string,
    shippingAddress?: ShippingAddress;
    quotedProducts: QuotedProduct[];
}
