import { Endereco } from "./endereco.model";

export interface Cliente {
    id?: String;
    name: String;
    obs: String;
    enderecos?: Endereco[];
}