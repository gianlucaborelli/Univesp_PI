package com.sisgem.main.address.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAddressRequestDto {
    
    @NotBlank(message = "CEP é obrigatório")
    private String zipCode;

    @NotBlank(message = "Nome da Rua é obrigatório")
    private String street;

    @NotBlank(message = "Número é obrigatório")
    private String number;

    @NotBlank(message = "Bairro é obrigatório")
    private String district;

    @NotBlank(message = "Cidade é obrigatório")
    private String city;

    @NotBlank(message = "Estado é obrigatório")
    private String state;
    
    private String description;
    
}
