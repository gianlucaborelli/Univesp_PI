import { Address } from "./address.model";

export interface User {
    id?: String;
    name: String;
    obs: String;
    addresses?: Address[];
}