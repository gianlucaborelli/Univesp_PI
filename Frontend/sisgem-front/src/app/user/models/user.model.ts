import { Address } from "../../models/address.model";

export interface User {
    id?: String;
    name: String;
    obs: String;
    addresses?: Address[];
}