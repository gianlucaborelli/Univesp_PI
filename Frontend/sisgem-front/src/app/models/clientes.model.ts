export interface Cliente {
    id?: String;
    name: String;
    obs: String;
    enderecos?: Endereco[];
}

export interface Endereco {
    id?: String;
    idCliente: String;
    cep: String;
    rua: String;
    numero: String;
    bairro: String;
    cidade: String;
    estado: String;
    obs: String;
}