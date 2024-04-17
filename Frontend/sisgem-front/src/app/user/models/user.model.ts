import { Address } from "./address.model";

export interface User {
    id?: string;
    name: string;
    obs: string;
    addresses?: Address[];
}