import { CartItem } from "./cart-item.mode";
import { ShippingAddress } from "./shipping-address.model";

export interface Cart{
    id?: string,
    userId: string,
    shippingAddress?: ShippingAddress,
    shippingDescription?: string,
    initialDate?: string,
    finalDate?: string,
    totalPrice?: number,
    cartItens: CartItem[]
}