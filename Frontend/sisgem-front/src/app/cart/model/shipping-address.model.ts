export interface ShippingAddress {
    id?: string,
    zipCode: string,
    street: string,
    number: string,
    district: string,
    city: string,
    state: string,
    description?: string,
    userId: string
}