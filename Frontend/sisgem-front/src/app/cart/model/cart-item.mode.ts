import { Product } from "src/app/products/models/product.model";

export interface CartItem{
    id?: string,
    amount: number,
    price: number,
    product: Product,
    cartId: string
}