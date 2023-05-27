export interface Cliente{
    id?: String;
    name: String;
    obs: String;
    enderecos: Endereco[];
}

export interface Endereco{
    id?:String;
    cep:String;
    rua:String;
    numero:String;
    bairro:String;
    cidade:String;
    estado:String;
    obs:String;
}