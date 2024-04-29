import { Product } from "./product.model";

export interface QuotedProduct {
    id?: string;
    price: string;
    amount: string;
    product: Product;
    quotationId: string;
}