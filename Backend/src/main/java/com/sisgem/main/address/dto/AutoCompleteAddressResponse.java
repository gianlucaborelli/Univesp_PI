package com.sisgem.main.address.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AutoCompleteAddressResponse {
    private String cep;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;
}
